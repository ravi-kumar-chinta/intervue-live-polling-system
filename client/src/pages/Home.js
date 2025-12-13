import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const continueHandler = () => {
    if (role === "student") navigate("/student");
    if (role === "teacher") navigate("/teacher");
  };
return (
  <div
  className="page"
  style={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}
>

    <div className="card" style={{ textAlign: "center" }}>
      <h2>Welcome to Intervue Poll</h2>
      <p>Please select how you want to continue</p>

      <div className="role-container">
        <div
          className={`role-card ${role === "student" ? "active" : ""}`}
          onClick={() => setRole("student")}
        >
          <h4>I’m a Student</h4>
          <p>Submit answers and view live results</p>
        </div>

        <div
          className={`role-card ${role === "teacher" ? "active" : ""}`}
          onClick={() => setRole("teacher")}
        >
          <h4>I’m a Teacher</h4>
          <p>Create polls and monitor responses</p>
        </div>
      </div>

      <button
        className="primary-btn"
        onClick={continueHandler}
        disabled={!role}
      >
        Continue
      </button>
    </div>
  </div>
);


}

export default Home;
