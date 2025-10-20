// src/components/Topbar.jsx
import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import logoAstra from "../assets/logoastra.png"; // ✅ gunakan import langsung
import "../styles/topbar.css";

const Topbar = ({ user, onLogout, pageTitle }) => {
  return (
    <header className="topbar">
      {/* === Bagian Kiri (Logo + Judul Halaman) === */}
      <div className="topbar-left">
        <img
          src={logoAstra}
          alt="Logo Astra"
          className="topbar-logo"
        />
        <span className="page-title">{pageTitle || "Dashboard"}</span>
      </div>

      {/* === Bagian Kanan (Search, Notifikasi, Profil) === */}
      <div className="right-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search or type a command (Ctrl + G)"
          />
        </div>

        <IoNotificationsOutline className="notif-icon" />

        <div className="profile-box">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="profile-avatar"
          />
          <span className="profile-name">{user?.nama || "User"}</span>
          <BiLogOut className="logout-icon" onClick={onLogout} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
