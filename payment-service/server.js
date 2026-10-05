const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

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

function processPayment(call, callback) {
  const { orderId, amount } = call.request;

  console.log(`Processing payment for order: ${orderId}`);
  console.log(`Amount: ₹${amount}`);

  callback(null, {
    success: true,
    message: `Payment processed for order ${orderId}`
  });
}

const server = new grpc.Server();

server.addService(paymentProto.PaymentService.service, {
  ProcessPayment: processPayment
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log(`Payment gRPC server running on port ${port}`);
  }
);