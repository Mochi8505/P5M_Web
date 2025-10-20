import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import DashboardKelasScreen from "./screens/DashboardKelasScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/dashboard-kelas/:id" element={<DashboardKelasScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
