const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let currentPoll = null;
let answers = {};
let studentsAnswered = new Set();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("createPoll", (poll) => {
    currentPoll = poll;
    answers = {};
    studentsAnswered.clear();

    poll.options.forEach((opt) => {
      answers[opt] = 0;
    });

    io.emit("newPoll", currentPoll);

    setTimeout(() => {
      io.emit("pollEnded", answers);
    }, 60000);
  });

  socket.on("submitAnswer", ({ studentId, option }) => {
    if (!studentsAnswered.has(studentId)) {
      studentsAnswered.add(studentId);
      answers[option]++;
      io.emit("pollResults", answers);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
