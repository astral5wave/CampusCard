import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import StudentForm from "./components/StudentForm";
import StudentCard from "./components/StudentCard";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/studentCard" element={<StudentCard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
