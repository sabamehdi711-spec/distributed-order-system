const query = `
mutation CreateOrder($orderId: ID!, $amount: Float!) {
  createOrder(orderId: $orderId, amount: $amount) {
    orderId
    amount
    payment {
      success
      message
    }
  }
}
`;

async function main() {
  try {
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        variables: {
          orderId: "ORDER001",
          amount: 500
        }
      })
    });

    const result = await response.json();

    console.log("Create Order Response:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();