import React from 'react';

export default function Settings({ token, onLogout, onRefresh }) {
  return (
    <div className="card p-4 shadow-sm col-md-8 mx-auto">
      <h2 className="text-primary mb-3">Paramètres</h2>

      <div className="mb-3">
        <label className="form-label">Token (lecture seule)</label>
        <textarea className="form-control" rows={4} readOnly value={token || '— non connecté —'} />
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-danger" onClick={onLogout}>Se déconnecter</button>
        <button className="btn btn-outline-secondary" onClick={onRefresh}>Rafraîchir token</button>
      </div>
    </div>
  );
}
