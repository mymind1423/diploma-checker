import React, { useState } from 'react';
import { login } from '../services/api';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      onLogin(); // met l'état logged à true dans App.jsx
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur login');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}
