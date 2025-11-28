import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

let token = null;

// Définir le token JWT après login
export const setToken = (newToken) => {
  token = newToken;
};

// Login
export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  setToken(res.data.token);
  return res.data;
};

// Upload image pour OCR
export const uploadImageOCR = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await axios.post(`${API_URL}/ocr`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.data;
};

// Récupérer les diplômes
export const getDiplomes = async () => {
  const res = await axios.get(`${API_URL}/diplomes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
