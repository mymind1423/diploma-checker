import React, { useEffect, useState } from 'react';
import { getDiplomes } from '../services/api';

export default function DiplomeList() {
  const [diplomes, setDiplomes] = useState([]);

  useEffect(() => {
    async function fetchDiplomes() {
      try {
        const data = await getDiplomes();
        setDiplomes(data);
      } catch (err) {
        console.error('Erreur récupération diplômes:', err);
      }
    }
    fetchDiplomes();
  }, []);

  return (
    <div>
      <h2>Liste des diplômes</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Nom complet</th>
            <th>Date de naissance</th>
            <th>Filière</th>
            <th>ID Étudiant</th>
            <th>Mention</th>
            <th>Date obtention</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {diplomes.map(d => (
            <tr key={d.reference}>
              <td>{d.reference}</td>
              <td>{d.fullName}</td>
              <td>{new Date(d.dateNaissance).toLocaleDateString()}</td>
              <td>{d.filiere}</td>
              <td>{d.idEtudiant}</td>
              <td>{d.mention}</td>
              <td>{d.dateObtention}</td>
              <td>{d.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
