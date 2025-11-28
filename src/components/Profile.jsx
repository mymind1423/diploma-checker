import React, { useState, useRef } from "react";
import { FiUser, FiLogOut, FiSave, FiEdit3, FiMoon, FiSun, FiCamera } from "react-icons/fi";

export default function ProfileComp({ loginInfo, onSave, onLogout }) {
  const [form, setForm] = useState({
    username: loginInfo?.username || "",
    email: loginInfo?.email || "",
  });

  const [saving, setSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setProfileImage(previewURL);
    }
  }

  return (
    
    <div
      className={`d-flex justify-content-center mt-4 ${
        darkMode ? "bg-dark text-white" : "bg-light"
      }`}
      style={{ minHeight: "100vh", paddingTop: "30px", transition: "0.3s" }}
    >
      <div
        className={`card shadow-lg p-4 ${
          darkMode ? "bg-secondary text-white" : "bg-white"
        }`}
        style={{ maxWidth: "500px", width: "100%", borderRadius: "20px" }}
      >
        {/* DARK MODE TOGGLE */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"}`}
            onClick={() => setDarkMode(!darkMode)}
            style={{ borderRadius: "50%", width: 40, height: 40 }}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        {/* PROFILE IMAGE */}
        <div className="text-center mb-4 position-relative">
          <div
            className="rounded-circle mx-auto d-flex justify-content-center align-items-center position-relative"
            style={{
              width: "120px",
              height: "120px",
              background: darkMode ? "#444" : "#e9ecef",
              fontSize: "50px",
              color: "#6c757d",
              cursor: "pointer",
              transition: "0.3s",
              overflow: "hidden",
            }}
            onClick={() => fileInputRef.current.click()}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <FiUser />
            )}

            {/* CAMERA ICON OVERLAY */}
            <div
              className="position-absolute bottom-0 w-100 d-flex justify-content-center"
              style={{
                background: "rgba(0,0,0,0.5)",
                height: "35px",
                alignItems: "center",
                opacity: 0,
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
            >
              <FiCamera size={18} className="text-white" />
            </div>
          </div>

          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />

          <h4 className="fw-bold mt-3">{form.username}</h4>
          <p className="text-muted" style={{ opacity: darkMode ? 0.8 : 1 }}>
            Profil utilisateur
          </p>
        </div>

        {/* USERNAME */}
        <div className="mb-3">
          <label className="form-label fw-medium">Nom d'utilisateur</label>
          <div className="input-group">
            <span className="input-group-text">
              <FiEdit3 />
            </span>
            <input
              type="text"
              name="username"
              className="form-control"
              value={form.username}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="form-label fw-medium">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <FiEdit3 />
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-danger d-flex align-items-center gap-2"
            onClick={onLogout}
          >
            <FiLogOut />
            Déconnexion
          </button>

          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={handleSave}
            disabled={saving}
          >
            <FiSave />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
