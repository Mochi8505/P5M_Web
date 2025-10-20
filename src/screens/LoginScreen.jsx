import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/BackgroundKampus.png";
import logoAstra from "../assets/astratechbiru.png";
import API_BASE_URL from "../util/Constant";
import { encryptData } from "../util/Encryptor";
import fetchData from "../util/useFetch";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  console.log("=== LOGIN REQUEST STARTED ===");
  setLoading(true);

  try {
    const url = `${API_BASE_URL}/Utilities/Login`;
    const payload = {
      p1: username,
      p2: password,
    };

    console.log("URL:", url);
    console.log("PAYLOAD:", payload);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("RESPONSE STATUS:", response.status, response.statusText);
    console.log("RESPONSE HEADERS:", [...response.headers.entries()]);

    const rawText = await response.text();
    console.log("RAW RESULT FROM API:", rawText);

    if (!response.ok) {
      console.error("❌ RESPONSE NOT OK");
      alert("Login gagal! Silakan periksa username/password.");
      setLoading(false);
      return;
    }

    let data;
    try {
      data = JSON.parse(rawText);
      console.log("✅ PARSED JSON:", data);
    } catch (err) {
      console.error("⚠️ JSON PARSE ERROR:", err);
      alert("Format data dari server tidak valid.");
      setLoading(false);
      return;
    }

    const userData = Array.isArray(data) ? data[0] : data;
    console.log("USER DATA (parsed):", userData);

    if (userData && userData.Status === "LOGIN SUCCESS") {
      console.log("🎉 LOGIN SUCCESS:", userData);
      alert("Login berhasil!");

      const encryptedUser = encryptData(JSON.stringify(userData));
      localStorage.setItem("user", encryptedUser);

      navigate("/home");
    } else {
      console.warn("⚠️ LOGIN FAILED DATA:", userData);
      alert("Login gagal. Data tidak valid atau kosong.");
    }
  } catch (error) {
    console.error("🔥 FETCH ERROR:", error);
    alert("Terjadi kesalahan koneksi ke server.");
  } finally {
    console.log("=== LOGIN REQUEST ENDED ===");
    setLoading(false);
  }
};


  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 61, 165, 0.8)",
          position: "absolute",
          inset: 0,
        }}
      />

      <div
        style={{
          zIndex: 2,
          backgroundColor: "white",
          padding: "3.5rem",
          borderRadius: "16px",
          boxShadow: "0 12px 45px rgba(0,0,0,0.45)",
          width: "100%",
          maxWidth: "520px",
          textAlign: "center",
        }}
      >
        <img
          src={logoAstra}
          alt="Logo AstraTech"
          style={{
            width: "260px",
            marginBottom: "3.5rem",
          }}
        />

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
            <label
              htmlFor="username"
              style={{ fontWeight: "600", fontSize: "1.1rem", color: "#000" }}
            >
              Akun Pengguna
            </label>
            <input
              type="text"
              id="username"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "1.1rem",
                borderRadius: "10px",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
                marginTop: "0.7rem",
                fontSize: "1.05rem",
                color: "#000",
              }}
            />
          </div>

          <div style={{ marginBottom: "2.5rem", textAlign: "left" }}>
            <label
              htmlFor="password"
              style={{ fontWeight: "600", fontSize: "1.1rem", color: "#000" }}
            >
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "1.1rem",
                borderRadius: "10px",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
                marginTop: "0.7rem",
                fontSize: "1.05rem",
                color: "#000",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1.3rem",
              backgroundColor: loading ? "#a0aec0" : "#004AAD",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "700",
              borderRadius: "10px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
              boxShadow: "0 4px 10px rgba(0, 77, 173, 0.3)",
            }}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
