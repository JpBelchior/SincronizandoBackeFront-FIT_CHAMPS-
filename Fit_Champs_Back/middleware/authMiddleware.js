// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const proteger = async (req, res, next) => {
  let token;

  // Verificar se o token está no header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Obter token do header
      token = req.headers.authorization.split(" ")[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obter usuário pelo id no token e excluir a senha
      req.usuario = await User.findById(decoded.id).select("-senha");

      next();
    } catch (error) {
      console.error("Erro na autenticação:", error);
      res.status(401).json({ mensagem: "Não autorizado, token inválido" });
    }
  }

  if (!token) {
    res.status(401).json({ mensagem: "Não autorizado, sem token" });
  }
};

module.exports = { proteger };
