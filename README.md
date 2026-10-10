
# Distributed Order System

A distributed microservices-based order processing system built using Node.js, GraphQL, and Docker.

## 📌 Project Overview

The Distributed Order System demonstrates how multiple independent services can work together to process customer orders.

The system uses an API Gateway with GraphQL as the main entry point. The gateway communicates with different backend services responsible for order processing, payment processing, and notifications.

## 🏗️ System Architecture

The project contains the following services:

- **API Gateway** – Provides the GraphQL API and acts as the entry point for clients.
- **Order Service** – Handles order creation and order-related operations.
- **Payment Service** – Processes payments associated with orders.
- **Notification Service** – Handles notifications related to order processing.
- **Proto** – Contains communication definitions used by the services.
- **Docker Compose** – Helps manage and run the services.

## 🛠️ Technologies Used

- Node.js
- JavaScript
- GraphQL
- Apollo Server
- Microservices Architecture
- Docker
- Docker Compose
- Git
- GitHub

## 📂 Project Structure

```text
distributed-order-system/
│
├── api-gateway/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
├── order-service/
│   ├── server.js
│   └── package.json
│
├── payment-service/
│   ├── server.js
│   └── package.json
│
├── notification-service/
│
├── proto/
│
├── client.js
├── outputFormat
├── docker-compose.yml
└── README.md
⚙️ How the System Works
The client sends a GraphQL request to the API Gateway.
The API Gateway receives the request.
The Order Service processes the order.
The Payment Service processes the payment.
The payment result is returned with the order information.
The Notification Service can handle notifications for the transaction.
🚀 Installation and Setup
1. Clone the Repository
git clone https://github.com/sabamehdi711-spec/distributed-order-system.git
cd distributed-order-system
2. Install Dependencies
Install dependencies for the required services:
cd api-gateway
npm install
For the Order Service:
cd ../order-service
npm install
For the Payment Service:
cd ../payment-service
npm install
▶️ Running the Project
Start the required services using Docker Compose:
docker-compose up
Alternatively, individual Node.js services can be started using:
node server.js
🧪 Testing the GraphQL Client
From the project root directory, run:
node client.js
The client communicates with the GraphQL API and displays the order and payment response.
✅ Example Output
A successful order response looks like:
{
  "orderId": "ORDER001",
  "amount": 500,
  "payment": {
    "success": true,
    "message": "Payment processed for order ORDER001"
  }
}
✨ Features
Distributed microservices architecture
GraphQL API Gateway
Order creation and processing
Payment processing
Notification service
Service-to-service communication
Docker-based development environment
GraphQL client for testing
Git and GitHub version control
🎯 Learning Outcomes
This project demonstrates practical knowledge of:
Microservices architecture
Distributed systems
GraphQL API development
Node.js backend development
API Gateway pattern
Service communication
Docker and containerization
Git and GitHub
👩‍💻 Author
Saba Mehdi
GitHub: https://github.com/sabamehdi711-spec⁠�
LinkedIn: https://www.linkedin.com/in/saba-mehdi-013673296⁠�



