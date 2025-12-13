import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function TeacherPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [results, setResults] = useState({});

  useEffect(() => {
    socket.on("pollResults", (data) => {
      setResults(data);
    });

    return () => {
      socket.off("pollResults");
    };
  }, []);

  const createPoll = () => {
    if (!question || !options) {
      alert("Enter question and options");
      return;
    }

    socket.emit("createPoll", {
      question,
      options: options.split(","),
    });

    setResults({});
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Let’s Get Started</h2>
        <p>Create a poll, ask questions, and monitor live responses.</p>

        {/* Question */}
        <div className="field">
          <label>Enter your question</label>
          <input
            type="text"
            placeholder="Type your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Timer */}
        <div className="field">
          <label>Time limit</label>
          <input type="text" value="60 seconds" disabled />
        </div>

        {/* Options */}
        <div className="field">
          <label>Edit options</label>
          <input
            type="text"
            placeholder="Option 1, Option 2, Option 3"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
          />
        </div>

        <button className="primary-btn" onClick={createPoll}>
          Ask Question
        </button>
      </div>
    <hr style={{ margin: "30px 0", borderColor: "#E5E7EB" }} />
      {/* Results */}
      <div className="card" style={{ marginTop: "25px" }}>
        <h3>Live Results</h3>

        {Object.keys(results).length === 0 && (
          <p>No responses yet</p>
        )}

        {Object.entries(results).map(([opt, count]) => {
          const total =
            Object.values(results).reduce((a, b) => a + b, 0) || 1;
          const percent = Math.round((count / total) * 100);

          return (
            <div key={opt} className="result-item">
              <div className="result-header">
                <span>{opt}</span>
                <span>{percent}%</span>
              </div>

              <div className="progress-bg">
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
