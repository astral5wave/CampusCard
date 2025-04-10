import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import StudentCard from "./components/StudentCard";

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/studentCard" element={<StudentCard/>} />
      </Routes>
    </BrowserRouter>
  </>;
}

export default App
