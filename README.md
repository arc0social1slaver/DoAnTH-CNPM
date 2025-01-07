# ThriftMate - Second-hand Clothing E-commerce

## About

ThriftMate is an e-commerce platform specialized in second-hand clothing, allowing users to buy and sell pre-loved fashion items.

## Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Features

- User authentication & authorization
- Product listing and search
- Shopping cart functionality
- Order management
- User profiles
- Admin dashboard

## Installation

### Prerequisites

- Node.js (v14+)
- MongoDB
- Git

### Setup Steps

1. **Clone the repository**
    ```bash
    git clone https://github.com/arc0social1slaver/DoAnTH-CNPM.git
    cd DoAnTH-CNPM
    ```

2. **Install backend dependencies**
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**
    ```bash
    cd frontend
    npm install
    ```

4. **Install socket server dependencies**
    ```bash
    cd socket
    npm install
    ```

5. **Create environment variables**

    - In the `backend` directory, create a `.env` file:
        ```
        MONGODB_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        PORT=5000
        ```

    - In the `frontend` directory, create a `.env` file:
        ```
        REACT_APP_API_URL=http://localhost:5000
        ```

    - In the `socket` directory, create a `.env` file:
        ```
        SOCKET_PORT=5001
        ```

6. **Run the backend server**
    ```bash
    cd backend
    npm run dev
    ```

7. **Run the frontend server**
    ```bash
    cd frontend
    npm run dev
    ```

8. **Run the socket server**
    ```bash
    cd socket
    npm run dev
    ```