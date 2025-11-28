import React from "react";
import logo from "./assets/logo.png";
import "./HomePage.css";

const HomePage = ({ onNavigateLogin }) => {
  return (
    <div className="home-wrapper">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="hero-section centered-hero">

        <img src={logo} alt="Grand logo" className="hero-big-logo centered-logo" />

        <h1 className="hero-title text-center mt-4">
          Vérification Officielle des Diplômes
        </h1>

        <p className="hero-subtitle text-center">
          Plateforme moderne et sécurisée pour authentifier les diplômes universitaires 
          en un clic.
        </p>

        <button className="btn btn-primary btn-lg hero-cta" onClick={onNavigateLogin}>
          🚀 Accéder au portail
        </button>

      </section>

      {/* ---------------- WHY SECTION ---------------- */}
      <section className="why-section container">
        <h2 className="section-title">Pourquoi choisir notre plateforme ?</h2>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="why-box shadow-sm">
              <div className="why-icon">⚡</div>
              <h3>Rapidité</h3>
              <p>
                La validation d’un diplôme se fait en moins d’une seconde grâce à
                notre système optimisé.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="why-box shadow-sm">
              <div className="why-icon">🎓</div>
              <h3>Données Officielles</h3>
              <p>
                Tous les diplômes proviennent directement de la base de données 
                universitaire sécurisée.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="why-box shadow-sm">
              <div className="why-icon">🛡️</div>
              <h3>Ultra Sécurisé</h3>
              <p>
                QR codes uniques, signatures numériques et système anti-fraude intégré.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="features-section">
        <h2 className="section-title">Fonctionnalités Principales</h2>

        <div className="container">
          <div className="row g-4">

            <div className="col-md-3">
              <div className="feature-box shadow-sm">
                <h4>📤 OCR Automatisé</h4>
                <p>Analyse intelligente des diplômes scannés.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-box shadow-sm">
                <h4>🔍 Recherche Rapide</h4>
                <p>Vérification instantanée par référence.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-box shadow-sm">
                <h4>📄 Relevés de Notes</h4>
                <p>Accès aux relevés officiels L1, L2, L3.</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-box shadow-sm">
                <h4>🎓 Diplômes Authentiques</h4>
                <p>Certificats validés avec QR code sécurisé.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="home-footer">
        © {new Date().getFullYear()} Université — Vérification des Diplômes. Tous droits réservés.
      </footer>

    </div>
  );
};

export default HomePage;
