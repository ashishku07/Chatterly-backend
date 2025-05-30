# DevTinder Backend

DevTinder is a developer-connection platform designed to help developers discover, connect, and collaborate with others who share similar technical skills and interests. This repository contains the backend microservice powered by Node.js, Express, MongoDB, and OpenAI integration for smart matchmaking and onboarding assistance.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Login / Signup)
- 👤 User Profile Management
- 🤝 Interest & Connection Requests
- 🧠 Smart Matching using AI (Cosine Similarity)
- 💬 AI-Powered Onboarding Assistant (OpenAI API)
- 📦 REST API with modular structure
- 🍪 Cookie-based session handling
- 🌍 CORS and HTTPS ready

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io
- **Authentication**: JWT, bcrypt
- **AI Integration**: OpenAI GPT-3.5
- **Validation**: validator.js

---

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Shams261/DevTinder.git
cd devtinder-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a .env file in the root directory

```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### 4. Run the development server

```bash
npm run dev
```
## 📚 API Endpoints

### 🔐 Authentication

- **POST** `/signup` – Register new user  
- **POST** `/login` – User login  
- **POST** `/logout` – User logout  

### 👤 Profile

- **GET** `/profile/view` – View profile  
- **POST** `/profile/edit` – Edit profile  

### 🤝 Connections

- **POST** `/request/send/:status/:toUserId` – Send connection request  
- **POST** `/request/review/:status/:requestId` – Review received request  
- **GET** `/user/requests/recieved` – View received requests  
- **GET** `/user/connections` – View accepted connections  

### 🧠 Smart Match

- **GET** `/api/smart-matches` – Get AI-powered matches  

### 💬 Chat

- **GET** `/api/chat/:targetUserId` – Get chat history  

### 🤖 AI Assistant

- **POST** `/api/ai-assistant` – Get AI assistance

### 🔐 Security

- Password hashing using bcrypt
- JWT-based authentication
- CORS protection
- Input validation
- Rate limiting
- Environment variable protection

---

## 🌐 Frontend Integration

This backend is built to work seamlessly with the [DevTinder Frontend](https://github.com/Shams261/DevTinder-frontend) built using **React (Vite)**, **Tailwind CSS**, and **DaisyUI**.

## 📘 Learning Resources

This backend project was built while learning from:

- [Namaste Node.js by Akshay Saini ](https://namastedev.com/learn/namaste-node)
A highly recommended series for understanding Node.js fundamentals and backend architecture.

## 📜 License
This project is open-source and available under the **MIT License**.
