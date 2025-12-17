import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://intervue-live-polling-system-qev6.onrender.com");

function TeacherPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [results, setResults] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [pollEnded, setPollEnded] = useState(true);

  useEffect(() => {
    socket.on("pollResults", (data) => {
      setResults(data);
    });

    socket.on("pollEnded", () => {
      setPollEnded(true);
      setTimeLeft(0);
    });

    return () => {
      socket.off("pollResults");
      socket.off("pollEnded");
    };
  }, []);

  const createPoll = () => {
    const optionList = options
      .split(",")
      .map((opt) => opt.trim())
      .filter(Boolean);

    if (!question.trim() || optionList.length < 2) {
      alert("Enter a question and at least 2 options");
      return;
    }

    const endTime = Date.now() + 60000;

    socket.emit("createPoll", {
      question: question.trim(),
      options: optionList,
      endTime,
    });

    setResults({});
    setPollEnded(false);
    setTimeLeft(60);

    const interval = setInterval(() => {
      const remaining = Math.max(
        Math.floor((endTime - Date.now()) / 1000),
        0
      );

      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        setPollEnded(true);
      }
    }, 1000);
  };

  const totalResponses = Object.values(results).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="page-container">
      <div className="page-card">
        <h2 className="page-title">Teacher Dashboard</h2>
        <p className="page-subtitle">
          Create polls and view live student responses.
        </p>

        {/* TIMER */}
        {timeLeft > 0 && (
          <p className="muted-text">⏳ Poll ends in {timeLeft}s</p>
        )}

        {/* QUESTION */}
        <div className="form-group">
          <label>Enter your question</label>
          <input
            type="text"
            placeholder="Type your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* OPTIONS */}
        <div className="form-group">
          <label>Edit options</label>
          <input
            type="text"
            placeholder="Option1, Option2, Option3"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          className="primary-btn"
          onClick={createPoll}
          disabled={!pollEnded}
        >
          {pollEnded ? "Create New Poll" : "Poll Running..."}
        </button>

        <hr className="divider" />

        <h3 className="section-title">Live Results</h3>

        <p className="muted-text">
          Total responses: {totalResponses}
        </p>

        {Object.keys(results).length === 0 && (
          <p className="muted-text">No responses yet</p>
        )}

        {Object.entries(results).map(([opt, count]) => {
          const percent =
            totalResponses === 0
              ? 0
              : Math.round((count / totalResponses) * 100);

          return (
            <div key={opt} className="result-item">
              <div className="result-header">
                <span>{opt}</span>
                <span>
                  {percent}% ({count})
                </span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeacherPage;
