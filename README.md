# Todo App with React & Node.js

A full-stack todo application built with React, Node.js, Express, and MongoDB. Features user authentication, CRUD operations for todos, and a clean, responsive UI built with Chakra UI.

## 🚀 Live Demo

Check out the live application: [Todo App](https://todo-node-production.up.railway.app/)

## ✨ Features

- **User Authentication**

  - Sign up with email
  - Login with existing account
  - JWT-based authentication
  - Protected routes

- **Todo Management**

  - Create new todos
  - Mark todos as complete/incomplete
  - Edit existing todos
  - Delete todos
  - Real-time updates

- **Modern UI**
  - Clean and responsive design
  - Built with Chakra UI components
  - Form validation
  - Loading states
  - Error handling

## 🛠️ Tech Stack

### Frontend

- React 19
- TypeScript
- Chakra UI
- React Router DOM
- React Hook Form
- JWT Decode
- Vite

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
- CORS

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/todo-app.git
```

2. Install server dependencies

```bash
cd server
npm install
```

3. Install client dependencies

```bash
cd ../todo-client
npm install
```

4. Create a `.env` file in the server directory

```env
todo_MONGO_URI=your_mongodb_connection_string
todo_jwtPrivateKey=your_jwt_secret
```

5. Create a `.env` file in the todo-client directory

```env
VITE_BASE_URL=http://localhost:3000
```

### Running the Application

1. Start the server

```bash
cd server
npm start
```

2. Start the client

```bash
cd todo-client
npm run dev
```

The application will be available at `http://localhost:5173`

## 📝 API Endpoints

### Auth Routes

- `POST /api/auth` - Sign in
- `POST /api/users` - Sign up

### Todo Routes (Protected)

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## 🔒 Security Features

- Password hashing using bcrypt
- JWT authentication
- Protected API routes
- CORS configuration
- Input validation

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/todo-app/issues).

## 📝 License

This project is [MIT](LICENSE) licensed.
