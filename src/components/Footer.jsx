import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-4 py-4 text-center text-muted small">
      © {new Date().getFullYear()} Portail Universitaire — Tous droits réservés
    </footer>
  );
}
