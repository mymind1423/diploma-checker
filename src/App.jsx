import React, { useState } from 'react';
import Login from './components/Login';
import OcrUpload from './components/OcrUpload';
import DiplomeList from './components/DiplomeList';

export default function App() {
  const [logged, setLogged] = useState(false);

  if (!logged) return <Login onLogin={() => setLogged(true)} />;

  return (
    <div>
      <h1>OCR & Diplômes</h1>
      <OcrUpload />
      <DiplomeList />
    </div>
  );
}
