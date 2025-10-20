import React from "react";
import { FaBars, FaChalkboardTeacher } from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = ({ activePage, onNavigate }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FaBars className="menu-icon" />
        <span className="app-name">Sistem P5M</span>
      </div>

      <nav className="menu-list">
        <button
          className={`menu-item ${activePage === "Dashboard" ? "active" : ""}`}
          onClick={() => onNavigate("Dashboard")}
        >
          <FaChalkboardTeacher /> Dashboard
        </button>

        <button
          className={`menu-item ${activePage === "Kelas" ? "active" : ""}`}
          onClick={() => onNavigate("Kelas")}
        >
          <FaChalkboardTeacher /> Kelas
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
