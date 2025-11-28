import React, { useState } from 'react';
import { uploadImageOCR } from '../services/api';

export default function OcrUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    try {
      const res = await uploadImageOCR(file);
      setResult(res.text);
    } catch (err) {
      setResult('Erreur OCR');
    }
  };

  return (
    <div>
      <h2>OCR Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Envoyer</button>
      </form>
      {result && (
        <div>
          <h3>Résultat OCR :</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}
