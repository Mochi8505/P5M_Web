import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import "../styles/topbar.css";

const Topbar = ({ user, onLogout, pageTitle }) => {
  console.log("🔍 pageTitle dari props:", pageTitle); // cek di console

  return (
    <header className="topbar">
      <div className="topbar-left">
        <img
          src="src/assets/logoastra.png"
          alt="Logo Astra"
          className="topbar-logo"
        />
        {/* pastikan ada text di sini */}
        <span className="page-title">{pageTitle || "Tidak ada judul"}</span>
      </div>

      <div className="right-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search or type a command (Ctrl + G)"
          />
        </div>
        <IoNotificationsOutline className="notif-icon" />
        <div className="profile-box">
          <img src="https://i.pravatar.cc/40" alt="profile" />
          <span>{user?.nama}</span>
          <BiLogOut className="logout-icon" onClick={onLogout} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
