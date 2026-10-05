const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({
  groupId: "notification-group"
});

const run = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: "order-created",
    fromBeginning: true
  });

  console.log("Kafka consumer connected...");
  console.log("Waiting for order events...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());

      console.log("New order received:");
      console.log(order);
    }
  });
};

run().catch(console.error);