import React, { useState } from "react";
import { FaBars, FaTimes, FaUpload, FaSearch, FaUserGraduate, FaUser, FaHome } from "react-icons/fa";
import logo from "./assets/logo.png";
import "./Sidebar.css";

const Sidebar = ({ onNavigate }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Bouton mobile */}

      <div className={`sidebar ${open ? "open" : ""}`}>
        
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h3>Université</h3>
        </div>

        <ul className="sidebar-menu">
          <li onClick={() => onNavigate("dashboard")}>
            <FaHome /> Dashboard
          </li>
          <li onClick={() => onNavigate("upload")}>
            <FaUpload /> Upload Diplôme
          </li>
          <li onClick={() => onNavigate("search")}>
            <FaSearch /> Recherche
          </li>
          <li onClick={() => onNavigate("students")}>
            <FaUserGraduate /> Étudiants
          </li>
          <li onClick={() => onNavigate("profile")}>
            <FaUser /> Profil
          </li>
        </ul>

      </div>
    </>
  );
};

export default Sidebar;
