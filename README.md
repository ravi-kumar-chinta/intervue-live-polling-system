# 🗳️ Intervue Live Polling System

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-black)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-brightgreen)
![Render](https://img.shields.io/badge/Backend-Render-purple)

A **real-time live polling system** built as part of the  
**Intervue SDE Intern Assignment**.

This application enables **teachers** to create polls and **students** to submit answers in real time, with **live result visualization**.

---

## 🚀 Live Demo

🔗 **Application URL**  
https://intervue-live-polling-system-rho.vercel.app

---

## 🧠 Problem Statement

Design and implement a real-time polling system where:
- Teachers can create polls
- Students can respond instantly
- Results update live for all users

The UI closely follows the **provided Figma design**.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js
- 🔌 Socket.io Client
- 🎨 CSS (Figma-inspired UI)

### Backend
- 🟢 Node.js
- 🚀 Express.js
- 🔴 Socket.io
- 🌐 CORS

### Deployment
- 🌍 Frontend: **Vercel**
- 🖥️ Backend: **Render**

---

## ✨ Key Features

### 👨‍🏫 Teacher Panel
- Create polls with a question and multiple options
- View live poll results
- Automatic poll timeout (60 seconds)
- Real-time progress bar updates

### 👨‍🎓 Student Panel
- Join and view live polls instantly
- Submit only **one answer per poll**
- Disabled options after submission
- Waiting screen for next poll

### 🔴 Real-Time Capabilities
- Instant synchronization using WebSockets
- No page refresh required
- Handles multiple concurrent users

---

## 📸 Screenshots

### 🏠 Welcome Screen
_Select role: Teacher or Student_

![Welcome Screen](screenshots/welcome.png)

---

### 👨‍🏫 Teacher – Create Poll
_Teacher creates a question and options_

![Teacher Create Poll](screenshots/teacher-panel.png)

---

### 👨‍🎓 Student – Answer Poll
_Student submits an answer_

![Student Poll](screenshots/student-panel.png)

---

### 📊 Live Results
_Real-time poll results with progress bars_

![Live Results](screenshots/live-results.png)

---

## 🔄 Application Flow

1. User selects role (Teacher / Student)
2. Teacher creates a poll
3. Students receive poll instantly
4. Students submit answers
5. Teacher sees live results
6. Poll ends automatically after timeout

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ravi-kumar-chinta/intervue-live-polling-system.git
cd intervue-live-polling-system
```

## ⚙️ Local Setup Instructions

### 2️⃣ Backend Setup
```bash
cd server
npm install
node index.js
```
Backend runs at:

`http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs at:

`http://localhost:3000`


### 📂 Project Structure

```bash
intervue-live-polling-system/
├── client/        # React frontend
├── server/        # Node.js backend
└── screenshots/   # README images
```

## 👤 Author

**Ravi Kumar Chinta**  

📧 **Email:** ravikumar.chinta@sasi.ac.in  
🔗 **GitHub:** https://github.com/ravi-kumar-chinta  
🔗 **LinkedIn:** https://www.linkedin.com/in/chinta-ravi-kumar-a0a763280/


## ⭐ Support & Feedback

If you find this project helpful or interesting, feel free to ⭐ **star this repository**.

Thank you for taking the time to review this project! 😊
