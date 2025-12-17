import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://intervue-live-polling-system-qev6.onrender.com");

function StudentPage() {
  const [poll, setPoll] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [pollEnded, setPollEnded] = useState(true);

  const studentId =
    window.sessionStorage.getItem("studentId") ||
    Math.random().toString(36).substring(2);

  window.sessionStorage.setItem("studentId", studentId);

  useEffect(() => {
    let interval;

    socket.on("newPoll", (data) => {
      setPoll(data);
      setSubmitted(false);
      setPollEnded(false);

      const updateTimer = () => {
        const remaining = Math.max(
          Math.floor((data.endTime - Date.now()) / 1000),
          0
        );
        setTimeLeft(remaining);

        if (remaining === 0) {
          setPollEnded(true);
        }
      };

      updateTimer();
      interval = setInterval(updateTimer, 1000);
    });

    socket.on("pollEnded", () => {
      setPollEnded(true);
      setTimeLeft(0);
      clearInterval(interval);
    });

    return () => {
      socket.off("newPoll");
      socket.off("pollEnded");
      clearInterval(interval);
    };
  }, []);

  const submitAnswer = (option) => {
    socket.emit("submitAnswer", { studentId, option });
    setSubmitted(true);
  };

  /* ================= WAITING SCREEN ================= */
  if (!poll) {
    return (
      <div className="page-container">
        <div className="page-card center">
          <h3>Waiting for the teacher...</h3>
          <p className="muted-text">⏳</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-card">
        <h2 className="page-title">Question</h2>

        {/* POLL STATUS */}
        <p className={`status ${pollEnded ? "ended" : "active"}`}>
          {pollEnded ? "🔴 Poll Ended" : "🟢 Poll Active"}
        </p>

        {/* TIMER (always visible while active) */}
        {!pollEnded && (
          <p className="muted-text">⏳ Time left: {timeLeft}s</p>
        )}

        <div className="question-box">{poll.question}</div>

        {/* OPTIONS / SUBMITTED MESSAGE */}
        {pollEnded ? (
          <div className="center">
            <p className="muted-text">
              Waiting for the next question.
            </p>
          </div>
        ) : !submitted ? (
          poll.options.map((opt) => (
            <button
              key={opt}
              className="option-btn"
              onClick={() => submitAnswer(opt)}
            >
              {opt}
            </button>
          ))
        ) : (
          <div className="center">
            <p><b>Answer submitted.</b></p>
            <p className="muted-text">
              Please wait for the poll to end.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentPage;
