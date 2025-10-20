import React from "react";
import { IoChevronForward } from "react-icons/io5";
import "../styles/datalist.css";

export default function DataList({ data, onItemClick }) {
  return (
    <div className="list-container">
      {data.map((item) => (
        <div
          key={item.id}
          className="card"
          onClick={() => onItemClick(item)}
        >
          <div className="text-container">
            <h3 className="title">{item.title || item.nama}</h3>
            {item.subtitle && <p className="subtitle">{item.subtitle}</p>}

            {item.kel_nama_lengkap && (
              <p className="info-text">{item.kel_nama_lengkap}</p>
            )}
            {item.kel_tahun_ajaran && (
              <p className="info-text">Tahun: {item.kel_tahun_ajaran}</p>
            )}
            {item.kel_tingkat && (
              <p className="info-text">Tingkat: {item.kel_tingkat}</p>
            )}

            {item.kel_status && (
              <div className="status-container">
                <span
                  className={`status-text ${
                    item.kel_status === "Aktif" ? "status-aktif" : "status-nonaktif"
                  }`}
                >
                  {item.kel_status}
                </span>
              </div>
            )}
          </div>
          <IoChevronForward size={22} color="#1E63C3" />
        </div>
      ))}
    </div>
  );
}
