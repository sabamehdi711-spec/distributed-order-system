
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = `#graphql
  type Payment {
    success: Boolean!
    message: String!
  }

  type Order {
    orderId: ID!
    amount: Float!
    payment: Payment!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    createOrder(orderId: ID!, amount: Float!): Order!
  }
`;

const resolvers = {
  Query: {
    hello: () => "GraphQL API is working!"
  },

  Mutation: {
    createOrder: async (_, { orderId, amount }) => {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId,
          amount
        })
      });

      if (!response.ok) {
        throw new Error("Order Service failed");
      }

      return await response.json();
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`GraphQL server running at ${url}`);
});