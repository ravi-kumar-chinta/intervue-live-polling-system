import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function StudentPage() {
    const [poll, setPoll] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const studentId =
        window.sessionStorage.getItem("studentId") ||
        Math.random().toString(36).substring(2);

    window.sessionStorage.setItem("studentId", studentId);

    useEffect(() => {
        socket.on("newPoll", (data) => {
            setPoll(data);
            setSubmitted(false);
        });

        socket.on("pollEnded", () => {
            setSubmitted(true);
        });

        return () => {
            socket.off("newPoll");
            socket.off("pollEnded");
        };
    }, []);

    const submitAnswer = (option) => {
        socket.emit("submitAnswer", { studentId, option });
        setSubmitted(true);
    };

    /* ================= WAITING SCREEN ================= */
    if (!poll) {
        return (
            <div className="page">
                <div className="card" style={{ textAlign: "center" }}>
                    <div className="loader" />
                    <p style={{ marginTop: "15px" }}>
                        Wait for the teacher to ask questions...
                    </p>
                </div>
            </div>
        );
    }

    /* ================= POLL SCREEN ================= */
    return (
        <div className="page">
            <div className="card">
                <h2>Question</h2>

                <div
                    style={{
                        background: "#f9fafb",
                        padding: "15px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                    }}
                >
                    <b>{poll.question}</b>
                </div>

                {!submitted ? (
                    poll.options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => submitAnswer(opt)}
                            className="option-btn"
                            disabled={submitted}
                        >
                            {opt}
                        </button>

                    ))
                ) : (
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <p><b>Answer submitted.</b></p>
                        <p>Wait for the teacher to ask a new question.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentPage;
