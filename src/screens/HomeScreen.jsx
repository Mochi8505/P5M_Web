import React, { useEffect, useState } from "react";
import { decryptData } from "../util/Encryptor";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import API_BASE_URL from "../util/Constant";
import fetchData from "../util/useFetch"; 
import DataList from "../components/DataList";
import Topbar from "../components/TopBar";
import Sidebar from "../components/Sidebar";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [kelasList, setKelasList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === LOAD USER + FETCH DATA ===
  useEffect(() => {
    const loadUserAndData = async () => {
      try {
        console.log("=== LOAD USER SESSION START ===");
        const encryptedUser = localStorage.getItem("user");
        console.log("Encrypted user data:", encryptedUser);

        if (!encryptedUser) {
          console.warn("Tidak ada data user di localStorage, redirect ke login.");
          navigate("/login");
          return;
        }

        const parsed = JSON.parse(decryptData(encryptedUser));
        console.log("Decrypted user data:", parsed);

        setUser(parsed);
        await fetchKelasData(parsed);
      } catch (err) {
        console.error("❌ Error loading user/data:", err);
        setError("Gagal memuat data pengguna atau kelas.");
      } finally {
        console.log("=== LOAD USER SESSION END ===");
        setLoading(false);
      }
    };

    loadUserAndData();
  }, [navigate]);

  // === FETCH DATA KELAS (pakai UseFetch) ===
  const fetchKelasData = async (session) => {
    try {
      console.log("=== FETCH KELAS START ===");
      setLoading(true);
      setError(null);

      const proId = session.ProId || session.proId;

      if (!proId) {
        console.warn("⚠️ proId tidak ditemukan dalam session:", session);
        setError("Data program studi tidak ditemukan. Silakan login ulang.");
        return;
      }

      const endpoint = `${API_BASE_URL}/KoorLab/GetListKelasByProdi`;
      const requestData = { pro_id: proId };

      console.log("CALLING fetchData() ->", endpoint, requestData);

      const result = await fetchData(endpoint, requestData, "POST");

      console.log("RESULT FROM UseFetch:", result);

      if (result === "ERROR" || !Array.isArray(result)) {
        throw new Error("Gagal mengambil data kelas.");
      }

      const transformed = result.map((item) => ({
        id: item.kelas_id || item.kel_id,
        title:
          item.kel_nama_display ||
          item.kel_nama_lengkap ||
          "Nama kelas tidak tersedia",
        subtitle: item.kon_nama || item.pro_nama || "Koordinator tidak diketahui",
        kel_nama_lengkap: item.kel_nama_lengkap,
        kel_tahun_ajaran: item.kel_tahun_ajaran,
        kel_tingkat: item.kel_tingkat,
        kel_status: item.kel_status,
      }));

      console.log("✅ TRANSFORMED KELAS DATA:", transformed);
      setKelasList(transformed);
    } catch (err) {
      console.error("🔥 ERROR FETCHING KELAS:", err);
      setError(err.message || "Terjadi kesalahan saat memuat data kelas.");
    } finally {
      console.log("=== FETCH KELAS END ===");
      setLoading(false);
    }
  };

  // === LOGOUT ===
  const handleLogout = () => {
    console.log("🚪 LOGOUT triggered, clearing user session.");
    localStorage.removeItem("user");
    navigate("/login");
  };

 // === ITEM CLICK ===
  const handleItemClick = (kelas) => {
    console.log("🧾 Kelas dipilih:", kelas);
    navigate(`/dashboard-kelas/${kelas.id}`, { state: kelas });
  };


  // === RETURN ===
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar
        activePage="Dashboard"
        onNavigate={(page) => console.log("Navigasi ke:", page)}
      />

      {/* Main Area */}
      <main className="main-area">
        <Topbar user={user} onLogout={handleLogout} pageTitle="Dashboard" />

        <section className="content">
          {loading ? (
            <div className="loading-text">Memuat data kelas...</div>
          ) : error ? (
            <div className="error-text">{error}</div>
          ) : (
            <DataList data={kelasList} onItemClick={handleItemClick} />
          )}
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;
