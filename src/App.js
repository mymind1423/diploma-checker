import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import uploadAnimation from "./assets/Loading.json";
import logo from "./assets/logo.png";
import { FaUpload, FaSearch, FaGraduationCap,FaExternalLinkAlt, FaRegCopy } from "react-icons/fa";
import "./App.css";
import HomePage from "./HomePage";
import Sidebar from "./Sidebar";

// New modern components
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import StudentsComp from "./components/Students";
import SettingsComp from "./components/Settings";
import ProfileComp from "./components/Profile";

const BASE_URL = "http://localhost:3000/api";

function App() {
  const [file, setFile] = useState(null);
  const [diplomeData, setDiplomeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dashboardStats, setDashboardStats] = useState(null);

  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);   // <<<<<< AJOUT
  const [page, setPage] = useState("dashboard");

  const [reference, setReference] = useState("");
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const fetchStats = async () => {
    try {
      const res = await secureFetch(`${BASE_URL}/stats`);
      const data = await res.json();
      setDashboardStats(data);
    } catch (err) {
      console.error("Erreur stats", err);
    }
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Login échoué");

      setToken(result.accessToken);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Impossible de rafraîchir le token");
      const data = await res.json();
      setToken(data.accessToken);
      return data.accessToken;
    } catch (err) {
      setToken("");
      setError("Session expirée, reconnectez-vous");
      throw err;
    }
  };

  // SECURE FETCH
  const secureFetch = async (url, options = {}) => {
    if (!token) throw new Error("Token manquant");

    options.headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    };

    let res = await fetch(url, options);

    if (res.status === 401) {
      const newToken = await refreshAccessToken();
      options.headers.Authorization = `Bearer ${newToken}`;
      res = await fetch(url, options);
    }

    return res;
  };

  // UPLOAD
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setUploadProgress(5);

    const formData = new FormData();
    formData.append("file", file);

    // Progression simulée côté UI
    let intervalId;
    try {
      intervalId = setInterval(() => {
        setUploadProgress((prev) => (prev < 90 ? prev + 8 : prev));
      }, 250);

      const res = await secureFetch(`${BASE_URL}/ocr/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Erreur serveur ${res.status}`);
      const result = await res.json();

      if (!result.reference) throw new Error("Aucune référence détectée");

      const diplomeRes = await secureFetch(
        `${BASE_URL}/diplomes/${result.reference}`
      );
      if (!diplomeRes.ok) throw new Error("Diplôme non trouvé");

      const diplome = await diplomeRes.json();
      setDiplomeData(diplome);
      setPage("diplome");
      setUploadProgress(100);
    } catch (err) {
      setError(err.message);
      setDiplomeData(null);
      setUploadProgress(0);
    } finally {
      clearInterval(intervalId);
      setTimeout(() => setUploadProgress(0), 800);
      setLoading(false);
    }
  };


  // SEARCH
  const searchByReference = async () => {
    if (!reference) return setError("Veuillez entrer une référence");
    setLoading1(true);
    setError("");

    try {
      const res = await secureFetch(`${BASE_URL}/diplomes/${reference}`);
      if (!res.ok) throw new Error("Référence introuvable");

      const diplome = await res.json();
      setDiplomeData(diplome);
      setPage("diplome");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading1(false);
    }
  };

  useEffect(() => {
    if (page === "dashboard" && token) {
      fetchStats();
    }
  }, [page, token]);


  const openReleve = (studentId, level) => {
    const url = `http://localhost:3000/releves/${studentId}_${level}.pdf`;
    window.open(url, "_blank");
  };

  // DIPLOMA CARD — show all recovered fields in a modern layout
  const DiplomaCard = ({ result }) => {
    const entries = result?.data ? Object.entries(result.data) : [];

    const formatKey = (k) =>
      k.replace(/_/g, " ").toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase());

    const handleCopy = (val) => {
      navigator.clipboard.writeText(String(val));
    };

    // Supprimer le dernier élément
    const cleanEntries = entries.slice(0, -1);

    // Diviser en 2 colonnes équilibrées
    const half = Math.ceil(cleanEntries.length / 2);
    const leftSide = cleanEntries.slice(0, half);
    const rightSide = cleanEntries.slice(half);

    return (
      <div className="diplome-card-wide shadow-lg p-4">

        {/* GRID 3 COLONNES */}
        <div className="row g-4">

          {/* ---------------------- */}
          {/* COL 1 : PHOTO + QR */}
          {/* ---------------------- */}
          <div className="col-xl-3 col-lg-4 text-center">

            {result.data?.PHOTO_URL && (
              <div className="photo-card mb-3">
                <img src={result.data.PHOTO_URL} alt="photo" className="photo-img" />
              </div>
            )}

            {result.qrCode && (
              <div className="qr-card mt-3">
                <img src={result.qrCode} alt="QR" className="qr-code" />
              </div>
            )}

            <div className="releves-container mt-3">
              <button className="releve-btn" onClick={() => openReleve(result.data.ID_ETUDIANT, "L1")}>📘 L1</button>
              <button className="releve-btn" onClick={() => openReleve(result.data.ID_ETUDIANT, "L2")}>📙 L2</button>
              <button className="releve-btn" onClick={() => openReleve(result.data.ID_ETUDIANT, "L3")}>📗 L3</button>
            </div>

          </div>

          {/* ---------------------- */}
          {/* COL 2 : INFOS GAUCHE */}
          {/* ---------------------- */}
          <div className="col-xl-4 col-lg-4">

            <h3 className="text-primary mb-3">
              <FaGraduationCap className="me-2" />
              {result.data?.FULL_NAME}
            </h3>

            <div className="details-column">
              {leftSide.map(([k, v]) => (
                <div className="diplome-field" key={k}>
                  <div className="field-label">{formatKey(k)}</div>
                  <div className="field-value">
                    {String(v)}
                    <button className="btn btn-sm btn-link copy-btn" onClick={() => handleCopy(v)}>
                      <FaRegCopy />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ---------------------- */}
          {/* COL 3 : INFOS DROITE */}
          {/* ---------------------- */}
          <div className="col-xl-5 col-lg-4">

            <h3 className="invisible">.</h3>

            <div className="details-column">
              {rightSide.map(([k, v]) => (
                <div className="diplome-field" key={k}>
                  <div className="field-label">{formatKey(k)}</div>
                  <div className="field-value">
                    {String(v)}
                    <button className="btn btn-sm btn-link copy-btn" onClick={() => handleCopy(v)}>
                      <FaRegCopy />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    );
  };

  // --------------------------
  // RETURN UI
  // --------------------------
  return (
    <div className="app-wrapper">

      {/* -------------------- */}
      {/* HOMEPAGE AVANT LOGIN */}
      {/* -------------------- */}
      {!token && !showLogin && (
        <HomePage onNavigateLogin={() => setShowLogin(true)} />
      )}

      {/* -------------------- */}
      {/* LOGIN PAGE */}
      {/* -------------------- */}
      {!token && showLogin && (
        <div className="login-wrapper d-flex justify-content-center align-items-center">
          <div className="login-card shadow-lg p-4">

            <div className="login-header text-center mb-4">
              <img src={logo} alt="Logo" className="login-logo" />
              <h2 className="login-title">Connexion au Portail</h2>
              <p className="login-subtitle">Accédez à votre espace sécurisé</p>
            </div>

            <input
              type="text"
              className="form-control mb-3 login-input"
              placeholder="Nom d'utilisateur"
              value={loginInfo.username}
              onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
            />

            <input
              type="password"
              className="form-control mb-3 login-input"
              placeholder="Mot de passe"
              value={loginInfo.password}
              onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
            />

            <button className="btn btn-primary w-100 login-btn" onClick={handleLogin}>
              Se connecter
            </button>

            {error && <p className="text-danger text-center mt-3">{error}</p>}
          </div>
        </div>
      )}

      {/* -------------------- */}
      {/* DASHBOARD + SIDEBAR */}
      {/* -------------------- */}
      {token && (
        <>
          <Sidebar onNavigate={setPage} />
          <button
            className="btn btn-outline-secondary"
            style={{position: "fixed", top: 20, right: 20, zIndex: 999}}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <div className="content" style={{ marginLeft: "260px", padding: "20px" }}>

            <div className="main-header">
              <img src={logo} alt="logo" />
              <h1>Portail de Vérification des Diplômes</h1>
            </div>

            {/* ------------------- */}
            {/* PAGES INTERNES */}
            {/* ------------------- */}

            {page === "dashboard" && (
              <Dashboard 
                onNavigate={setPage}
                stats={dashboardStats || { students: 0, diplomasVerified: 0, recent: [] }}
              />
            )}

            {page === "upload" && (
              <div className="upload-wrapper col-md-10 mx-auto">

                <div className="upload-header text-center mb-4">
                  <div className="upload-icon-circle">
                    <FaUpload />
                  </div>
                  <h2 className="upload-title">Vérifier un diplôme</h2>
                  <p className="upload-subtitle">
                    Glissez-déposez un diplôme (image ou PDF) ou sélectionnez un fichier depuis votre ordinateur.
                  </p>
                </div>

                <div className="upload-card glass-card shadow-lg p-4">

                  {/* Zone Drag & Drop */}
                  <div
                    className={`upload-dropzone ${dragActive ? "drag-active" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-input-hidden").click()}
                  >
                    <p className="mb-1">
                      <strong>Déposez votre fichier ici</strong>
                    </p>
                    <p className="small mb-3">ou cliquez pour parcourir vos documents</p>

                    {file && (
                      <p className="file-name">
                        📄 {file.name}
                      </p>
                    )}
                  </div>

                  {/* Input caché */}
                  <input
                    id="file-input-hidden"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  {/* Barre de progression */}
                  {uploadProgress > 0 && (
                    <div className="progress mt-3">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        {uploadProgress}%
                      </div>
                    </div>
                  )}

                  {/* Bouton */}
                  <button
                    className="btn btn-primary w-100 big-upload-btn mt-3"
                    onClick={handleUpload}
                    disabled={!file || loading}
                  >
                    {loading ? "Analyse en cours…" : "Analyser le diplôme"}
                  </button>

                  {/* Loader */}
                  {loading && (
                    <div className="text-center mt-3">
                      <Lottie animationData={uploadAnimation} style={{ height: 90 }} />
                    </div>
                  )}
                </div>

                {/* Encadré explicatif */}
                <div className="how-it-works-card glass-card mt-4 p-3">
                  <h5>Comment ça marche ?</h5>
                  <ol className="mb-0">
                    <li>Vous téléversez une copie du diplôme (photo ou PDF).</li>
                    <li>Le système analyse le document via OCR.</li>
                    <li>La référence est extraite et vérifiée dans la base officielle.</li>
                    <li>Le diplôme et les informations associées s’affichent automatiquement.</li>
                  </ol>
                </div>
              </div>
            )}

            {page === "search" && (
              <div className="search-wrapper col-md-10 mx-auto">

                <div className="search-header text-center mb-4">
                  <div className="search-icon-circle">
                    <FaSearch />
                  </div>
                  <h2 className="search-title">Recherche par référence</h2>
                  <p className="search-subtitle">
                    Saisissez une référence de diplôme pour vérifier son authenticité.
                  </p>
                </div>

                <div className="search-card glass-card shadow-lg p-4">

                  <div className="position-relative">
                    <input
                      className="form-control form-control-lg mb-2 search-input"
                      placeholder="Ex : 12345"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn-primary w-100 big-search-btn mt-2"
                    onClick={searchByReference}
                  >
                    Rechercher maintenant
                  </button>

                  {loading1 && (
                    <div className="text-center mt-3">
                      <Lottie animationData={uploadAnimation} style={{ height: 90 }} />
                    </div>
                  )}
                </div>

                {/* Encadré explicatif */}
                <div className="how-it-works-card glass-card mt-4 p-3">
                  <h5>Conseils de recherche</h5>
                  <ul className="mb-0">
                    <li>Utilisez la référence exacte figurant sur le diplôme.</li>
                    <li>En cas d’erreur, vérifiez qu’il n’y a pas d’espace ou de caractère supplémentaire.</li>
                    <li>Contactez l’administration en cas de référence introuvable.</li>
                  </ul>
                </div>
              </div>
            )}

            {page === "students" && (
              <StudentsComp token={token} />
            )}

            {page === "settings" && (
              <SettingsComp 
                token={token}
                onLogout={() => {
                  setToken("");
                  setShowLogin(true);
                  setPage("dashboard");
                  setDiplomeData(null);
                }}
                onRefresh={async () => {
                  try { 
                    await refreshAccessToken(); 
                    setError("Token rafraîchi"); 
                  } catch (e) {} 
                }}
              />
            )}

            {page === "profile" && (
              <ProfileComp
                loginInfo={loginInfo}
                onSave={async (updated) => {
                  try {
                    if (token) {
                      const putRes = await secureFetch(`${BASE_URL}/users/me`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updated),
                      });
                      if (!putRes.ok) throw new Error('Erreur serveur lors de la mise à jour');
                      const data = await putRes.json();
                      setLoginInfo({ ...loginInfo, username: data.username || updated.username });
                    } else {
                      setLoginInfo({ ...loginInfo, username: updated.username });
                    }
                  } catch (err) {
                    setLoginInfo({ ...loginInfo, username: updated.username });
                    setError(err.message || 'Impossible de mettre à jour le profil');
                    throw err;
                  }
                }}
                onLogout={() => { setToken(''); setShowLogin(true); setPage('dashboard'); setDiplomeData(null); }}
              />
            )}

            {page === "diplome" && diplomeData && (
              <div className="col-12 px-4">
                <DiplomaCard result={diplomeData} />
              </div>
            )}

            {error && <p className="alert alert-danger text-center">{error}</p>}

            <Footer />
          </div>
        </>
      )} 
    </div>
  );

}

export default App;
