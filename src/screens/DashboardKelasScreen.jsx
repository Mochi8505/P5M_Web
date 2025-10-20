// src/screens/DashboardKelasScreen.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaHeart, FaLock, FaUnlock, FaBriefcase } from "react-icons/fa";
import "../styles/dashboardKelas.css";

const DashboardKelasScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const kelas = location.state;

  if (!kelas) {
    navigate("/");
    return null;
  }

  // === Dummy Data ===
  const pieData = [
    { name: "Hadir", value: 80, color: "#3B82F6" },
    { name: "Tidak Hadir", value: 10, color: "#FACC15" },
    { name: "Alpha", value: 10, color: "#F87171" },
  ];

  const barData = [
    { name: "Jan", total: 15 },
    { name: "Feb", total: 20 },
    { name: "Mar", total: 22 },
    { name: "Apr", total: 18 },
    { name: "May", total: 25 },
    { name: "Jun", total: 30 },
    { name: "Jul", total: 18 },
    { name: "Aug", total: 24 },
    { name: "Sep", total: 12 },
    { name: "Oct", total: 20 },
    { name: "Nov", total: 16 },
    { name: "Dec", total: 14 },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        activePage="Dashboard"
        onNavigate={(page) => console.log("Navigasi ke:", page)}
      />

      {/* Main Area */}
      <main className="main-area">
        <Topbar pageTitle={`Dashboard - ${kelas.title}`} />

        <div className="dashboard-content fade-in">
          {/* HEADER */}
          <h1>Dashboard Kelas: {kelas.title}</h1>
          <p>
            Tahun Ajaran: {kelas.kel_tahun_ajaran || "Tidak diketahui"} | Tingkat:{" "}
            {kelas.kel_tingkat || "-"}
          </p>

          {/* STATISTIK INFO BOX (seperti mini chart) */}
          <div className="info-boxes">
            <div className="info-card">
              <div className="icon-wrapper blue-bg">
                <FaHeart className="icon" />
              </div>
              <div className="info-text">
                <h3>40</h3>
                <p>Total Mahasiswa</p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-wrapper yellow-bg">
                <FaLock className="icon" />
              </div>
              <div className="info-text">
                <h3>10</h3>
                <p>Mahasiswa Melanggar</p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-wrapper red-bg">
                <FaUnlock className="icon" />
              </div>
              <div className="info-text">
                <h3>25</h3>
                <p>Mahasiswa Tidak Melanggar</p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-wrapper purple-bg">
                <FaBriefcase className="icon" />
              </div>
              <div className="info-text">
                <h3>5</h3>
                <p>Mahasiswa Tidak Hadir</p>
              </div>
            </div>
          </div>

          {/* CHARTS */}
          <div className="chart-grid">
            {/* Donut Chart */}
            <div className="card">
              <h2 className="card-title">Daftar Hadir</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-legend">
                {pieData.map((d, i) => (
                  <div key={i} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ backgroundColor: d.color }}
                    ></span>
                    {d.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Bar Chart */}
            <div className="card">
              <h2 className="card-title">Total Pelanggaran</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#4338CA" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardKelasScreen;
