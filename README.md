# 💬 Real-Time Chat Application

A modern, full-stack real-time chat application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and **Socket.IO** for instant communication. The application provides secure authentication, real-time messaging, online user tracking, profile management, and a responsive user experience.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration
* User Login & Logout
* JWT-based Authentication
* Protected Routes
* Secure Password Hashing using bcrypt

### 💬 Real-Time Messaging

* Instant One-to-One Messaging
* Real-Time Updates using Socket.IO
* Online/Offline User Status
* Live Message Delivery

### 👤 User Management

* User Profiles
* Profile Picture Upload
* Update Profile Information
* Online Presence Tracking

### 🎨 Modern UI/UX

* Responsive Design
* Tailwind CSS Styling
* DaisyUI Themes
* Dark/Light Theme Support
* Mobile-Friendly Interface
* Loading States & Toast Notifications

### 📦 State Management

* Global State Management using Zustand
* Optimized Data Fetching
* Real-Time State Synchronization

### ☁️ Cloud Storage

* Cloudinary Integration for Image Uploads
* Secure Media Storage
* Optimized Image Delivery

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Zustand
* Axios
* Socket.IO Client
* React Router DOM
* Tailwind CSS
* DaisyUI
* React Hot Toast
* Lucide React Icons

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT
* bcryptjs
* Cookie Parser
* Cloudinary
* dotenv

---

# 📂 Project Structure

```bash
chat-app/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── lib/
│   │   ├── index.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── lib/
│   │   ├── constants/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/chat-app.git

cd chat-app
```

---

# Backend Setup

```bash
cd backend

npm install
```

### Create .env file

```env
PORT=5001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

### Run Backend

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:5001
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

### Run Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# 🔄 Socket.IO Workflow

1. User logs in successfully.
2. Socket connection is established.
3. User ID is mapped to Socket ID.
4. Online users are broadcast to all clients.
5. Messages are emitted instantly.
6. Receiver gets message in real-time.
7. Online status updates dynamically.

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | /api/auth/signup | Register User         |
| POST   | /api/auth/login  | Login User            |
| POST   | /api/auth/logout | Logout User           |
| GET    | /api/auth/check  | Verify Authentication |

---

## Messages

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| GET    | /api/messages/users    | Get Sidebar Users |
| GET    | /api/messages/:id      | Get Messages      |
| POST   | /api/messages/send/:id | Send Message      |

---

## Profile

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| PUT    | /api/auth/update-profile | Update Profile Picture |

---

# 🔒 Security Features

* JWT Authentication
* HTTP Only Cookies
* Password Hashing with bcrypt
* Protected API Routes
* User Authorization Checks
* Environment Variables Protection

---

# 🎨 UI Features

* Multiple DaisyUI Themes
* Theme Persistence
* Responsive Sidebar
* Real-Time Online Indicators
* Chat Bubble Design
* Image Message Support
* Profile Preview

---

# 🖼️ Screenshots

Add screenshots of:

* Login Page
* Signup Page
* Chat Dashboard
* User Profile
* Theme Selector

Example:

```md
![Login](./screenshots/login.png)

![Chat](./screenshots/chat.png)
```

---

# 🚀 Deployment

## Backend

Deploy on:

* Render
* Railway
* VPS
* AWS EC2

## Frontend

Deploy on:

* Vercel
* Netlify
* Firebase Hosting

---

# 🧪 Future Enhancements

* ✅ Group Chats
* ✅ Message Reactions
* ✅ Read Receipts
* ✅ Voice Messages
* ✅ Audio & Video Calling
* ✅ File Sharing
* ✅ Message Search
* ✅ Push Notifications
* ✅ Message Deletion
* ✅ End-to-End Encryption

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Rushikesh Watane**

* Full Stack Developer
* MERN Stack Enthusiast
* Passionate about Real-Time Applications

If you like this project, give it a ⭐ on GitHub!
