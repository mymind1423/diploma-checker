import React from "react";
import "./Dashboard.css";
import { FaUserGraduate, FaCheckCircle, FaSearch } from "react-icons/fa";

const Dashboard = ({ stats, onNavigate }) => {
  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">Tableau de bord</h2>

      {/* --- STAT CARDS --- */}
      <div className="dashboard-cards">

        {/* Total étudiants */}
        <div className="dash-card">
          <div className="dash-icon icon-blue">
            <FaUserGraduate />
          </div>
          <h3>{stats.students ?? 0}</h3>
          <p>Étudiants enregistrés</p>
        </div>

        {/* Diplômes vérifiés */}
        <div className="dash-card">
          <div className="dash-icon icon-green">
            <FaCheckCircle />
          </div>
          <h3>{stats.diplomasVerified ?? 0}</h3>
          <p>Diplômes vérifiés</p>
        </div>

        {/* Recherches récentes */}
        <div className="dash-card">
          <div className="dash-icon icon-purple">
            <FaSearch />
          </div>
          <h3>{stats?.recent?.length ?? 0}</h3>
          <p>N° Authentication Faites Today</p>
        </div>

      </div>

      {/* --- BUTTONS --- */}
      <div className="dashboard-actions">
        <button className="btn btn-primary big-btn" onClick={() => onNavigate("upload")}>
          📤 Vérifier un diplôme
        </button>

        <button className="btn btn-secondary big-btn" onClick={() => onNavigate("search")}>
          🔍 Recherche par référence
        </button>

        <button className="btn btn-dark big-btn" onClick={() => onNavigate("students")}>
          👥 Voir les étudiants
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
