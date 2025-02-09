# Real-Time Chat Application Documentation

## Table of Contents  
- [Introduction](#introduction)  

- [Architecture Overview](#architecture-overview)  
  - [Frontend (Client)](#frontend-client)  
  - [Backend (Server)](#backend-server)  
  - [Database](#database)  
  - [Authentication](#authentication)  

- [Backend Design Structure](#backend-design-structure)  
  - [Database Models](#database-models)  
    - [User Model](#user-model)  
    - [Chat Model](#chat-model)  
    - [Message Model](#message-model)  

- [API Routes](#api-routes)  
  - [User Routes](#user-routes)  
  - [Chat Routes](#chat-routes)  
  - [Message Routes](#message-routes)  

- [Middleware](#middleware)  
  - [Authentication Middleware (protect)](#authentication-middleware-protect)
    
- [Frontend Integration](#frontend-integration)  
  - [REST API Calls](#rest-api-calls)  
  - [WebSocket Events](#websocket-events)  

---

## Introduction  
============

This project implements a **real-time chat application** using **WebSockets** for communication between clients and the server. It supports features such as:  
- User authentication  
- Private messaging  
- Group chats  
- Chat history storage  

### Tech Stack  
------------
- **Frontend:** React, Chakra UI  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **WebSocket Communication:** Socket.IO  
- **Authentication:** JSON Web Tokens (JWT)  

---

## Architecture Overview  
=========================

### Frontend (Client)  
----------------------
- Built with **React** and styled using **Chakra UI** for a modern and responsive UI.  
- Communicates with the backend via **REST APIs** and **WebSocket events**.  
- Manages user interactions such as sending/receiving messages, joining chats, and managing group chats.  

### Backend (Server)  
----------------------
- Built with **Node.js** and **Express**.  
- **Socket.IO** is used for managing WebSocket connections for real-time communication.  
- **REST APIs** are implemented for user authentication, chat management, and message handling.  
- **MongoDB** stores user data, chat history, and group information.  

### Database  
----------------------
**MongoDB** is used to store:  
- User profiles  
- Chat metadata  
- Messages  

**ObjectId references** are used to manage relationships between collections.  

### Authentication  
----------------------
- Implemented using **JWT** for secure user authentication.  
- **Middleware** ensures only authenticated users can access protected routes.  

---

## Backend Design Structure  
=============================

### Database Models  
----------------------
The backend uses **Mongoose schemas** to define the data structure stored in MongoDB.  

#### User Model  
----------------------
Stores user details such as name, email, password, and profile picture. Passwords are hashed using **bcrypt** before storage.  

```javascript
const userModel = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  pic: {
    type: String,
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
}, { timestamps: true });
```

#### Chat Model  
----------------------
Represents individual or group chats. Tracks participants, group admin, and the latest message.  

```javascript
const chatModel = mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
```

#### Message Model  
----------------------
Stores messages sent in chats. Each message is linked to its sender and the associated chat.  

```javascript
const messageModel = mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
}, { timestamps: true });
```

---

## API Routes  
==============

### User Routes  
----------------------
Handles user registration, login, and fetching user details. Protected routes require **JWT-based authentication**.  

```javascript
router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);
```

### Chat Routes  
----------------------
Manages chat creation, fetching, and group chat operations.  

```javascript
router.route('/').post(protect, accessChat).get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/groupremove').put(protect, removeFromGroup);
router.route('/groupadd').put(protect, addToGroup);
```

### Message Routes  
----------------------
Handles sending messages and fetching chat history.  

```javascript
router.route('/').post(protect, sendMessage);
router.route('/:chatId').get(protect, allMessages);
```

---

## Middleware  
==============

### Authentication Middleware (protect)  
----------------------
Verifies **JWT tokens** in the `Authorization` header. If the token is valid, it decodes the token to retrieve the user ID and attaches the user object to `req.user`.  

```javascript
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
```

---

## Frontend Integration  
=========================

### REST API Calls  
----------------------
**Axios** or **Fetch API** is used for interacting with the backend's REST endpoints. Example:  
- Fetching chat history  
- Sending messages  

### WebSocket Events  
----------------------
**Socket.IO** establishes a real-time connection between the client and server. Event listeners handle:  
- Incoming messages  
- User join/leave notifications  
- Connection status updates  

---
