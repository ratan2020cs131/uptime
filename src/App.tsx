import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/shreeramk" />} />
      <Route path="/:user_name" element={<Home />} />
      <Route path="/shreeramk" element={<Home />} />
    </Routes>
  );
}

export default App;
