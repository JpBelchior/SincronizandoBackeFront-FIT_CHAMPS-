// Crie um arquivo src/services/authService.js
import api from "./api";

// Registro de usuário
export const register = async (userData) => {
  const response = await api.post("/users/registro", userData);
  if (response.data.token) {
    localStorage.setItem("userToken", response.data.token);
    localStorage.setItem("userData", JSON.stringify(response.data));
  }
  return response.data;
};

// Login de usuário
export const login = async (email, senha) => {
  const response = await api.post("/users/login", { email, senha });
  if (response.data.token) {
    localStorage.setItem("userToken", response.data.token);
    localStorage.setItem("userData", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout de usuário
export const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userData");
};

// Obter dados do usuário atual
export const getCurrentUser = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

// Verificar se o usuário está autenticado
export const isAuthenticated = () => {
  return localStorage.getItem("userToken") !== null;
};
