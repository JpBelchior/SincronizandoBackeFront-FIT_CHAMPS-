// server.js (atualizado)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Carrega variáveis de ambiente
dotenv.config();

// Importa rotas
const userRoutes = require("./Routes/userRoutes");

// Inicializa o app Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para processar requisições com JSON

// Usa as rotas
app.use("/api/users", userRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso");
    // Inicia o servidor apenas depois da conexão com o banco
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

// Rota básica para testar
app.get("/", (req, res) => {
  res.send("API do Fit Champs funcionando!");
});
