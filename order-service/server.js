const express = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { Kafka } = require("kafkajs");
const path = require("path");

const app = express();
app.use(express.json());

// =========================
// gRPC setup
// =========================

const PROTO_PATH = path.join(__dirname, "../proto/order.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const paymentProto =
  grpc.loadPackageDefinition(packageDefinition).payment;

const paymentClient = new paymentProto.PaymentService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// =========================
// Kafka setup
// =========================

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

async function startKafka() {
  await producer.connect();
  console.log("Kafka producer connected...");
}

startKafka().catch(console.error);

// =========================
// Create Order
// =========================

app.post("/orders", (req, res) => {
  const { orderId, amount } = req.body;

  paymentClient.ProcessPayment(
    {
      orderId,
      amount
    },
    async (error, response) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message
        });
      }

      // Send order event to Kafka
      try {
        await producer.send({
          topic: "order-created",
          messages: [
            {
              value: JSON.stringify({
                orderId,
                amount,
                payment: response
              })
            }
          ]
        });

        console.log(`Order event sent to Kafka: ${orderId}`);
      } catch (kafkaError) {
        console.error("Kafka error:", kafkaError);
      }

      res.json({
        orderId,
        amount,
        payment: response
      });
    }
  );
});

// =========================
// Start server
// =========================

app.listen(5000, () => {
  console.log("Order Service running on port 5000");
});