import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
