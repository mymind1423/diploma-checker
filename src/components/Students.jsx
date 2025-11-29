import React, { useState, useEffect } from 'react';
import { FiSearch, FiUpload } from "react-icons/fi";

export default function StudentsComp({ token }) {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://backend-diploma-q2sg.onrender.com/api/students", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);


  const filtered = students.filter(s =>
    s.fullName?.toLowerCase().includes(query.toLowerCase()) ||
    s.reference?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "1100px", width: "100%", borderRadius: 20 }}>

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0">📚 Étudiants</h4>

          <div className="d-flex gap-2">

            {/* SEARCH */}
            <div className="input-group" style={{ maxWidth: 300 }}>
              <span className="input-group-text bg-white">
                <FiSearch className="text-secondary" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>

            {/* UPLOAD BUTTON */}
            <button className="btn btn-primary d-flex align-items-center gap-2 upload-btn">
              <FiUpload size={18} />
              Importer
            </button>
          </div>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="text-center py-4">Chargement...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Référence</th>
                  <th>Nom complet</th>
                  <th>Date naissance</th>
                  <th>Filière</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Adresse</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length ? filtered.map((s) => (
                  <tr key={s.id}>
                    <td>{s.reference}</td>
                    <td>{s.fullName}</td>
                    <td>{s.dateNaissance ? new Date(s.dateNaissance).toLocaleDateString() : ""}</td>
                    <td>{s.filiere}</td>
                    <td>{s.email}</td>
                    <td>{s.telephone}</td>
                    <td>{s.adresse}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="text-center text-muted py-4">
                      Aucun étudiant trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* EXTRA ANIMATIONS */}
      <style>
        {`
          .upload-btn {
            transition: all 0.3s ease;
          }
          .upload-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.15);
          }
          .upload-btn:active {
            transform: scale(0.97);
          }
        `}
      </style>
    </div>
  );
}

