// app.ts (modificado)
import express from "express";
import type { Express } from "express";
import cors from "cors";
import { routerSetup } from "./routes/routerSteup";
import envconfig from "./config/envconfig";
import { getDatabaseConnection } from "./database/databaseConnection";

function getExpressApp(): Express {
  const app = express();

  // Configuração do CORS
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "*", // Permitir o frontend ou qualquer origem em desenvolvimento
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.json());
  routerSetup(app);
  return app;
}

async function start() {
  try {
    // Conectar ao banco de dados antes de iniciar o servidor
    const dbConnection = getDatabaseConnection();
    await dbConnection.connect();

    const app = getExpressApp();
    const httpPort = envconfig.httpPort();

    app.listen(httpPort, () => {
      console.log(`Server running on port ${httpPort}`);
    });

    // Capturar sinais de encerramento para fechar a conexão do banco de dados
    process.on("SIGINT", async () => {
      await dbConnection.disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      await dbConnection.disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor:", error);
    process.exit(1);
  }
}

start();
