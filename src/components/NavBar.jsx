import React from 'react';
import { FaBell, FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';

export default function NavBar({ onToggle, onSearch, userName }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-3">
      <div className="container-fluid">
        <button className="btn btn-outline-secondary me-2" onClick={onToggle} aria-label="Toggle sidebar"><FaBars /></button>

        <form className="d-flex ms-2" onSubmit={(e) => { e.preventDefault(); onSearch?.(); }}>
          <div className="input-group">
            <input className="form-control" placeholder="Rechercher une référence ou un étudiant" />
            <button className="btn btn-primary" type="submit"><FaSearch /></button>
          </div>
        </form>

        <div className="d-flex align-items-center ms-auto gap-3">
          <button className="btn position-relative">
            <FaBell />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
          </button>

          <div className="d-flex align-items-center">
            <FaUserCircle size={28} className="me-2 text-secondary" />
            <div className="d-none d-md-block">
              <div style={{fontSize:12}}>Bonjour</div>
              <div className="fw-bold">{userName || 'Utilisateur'}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
