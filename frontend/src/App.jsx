// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/login";
import Register from "./pages/Register";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <Router>
        <CustomCursor />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
