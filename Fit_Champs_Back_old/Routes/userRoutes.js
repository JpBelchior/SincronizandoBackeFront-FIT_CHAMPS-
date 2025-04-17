// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
  getPerfil,
  atualizarPerfil,
} = require("../controllers/userController");
const { proteger } = require("../middleware/authMiddleware");

// Rotas públicas
router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);

// Rotas protegidas
router.get("/perfil", proteger, getPerfil);
router.put("/perfil", proteger, atualizarPerfil);

module.exports = router;
