// app.ts (modificado)
import express from "express";
import type { Express } from "express";
import cors from "cors";
import { routerSetup } from "./routes/routerSteup";
import envconfig from "./config/envconfig";

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

function start() {
  const app = getExpressApp();
  const httpPort = envconfig.httpPort();
  app.listen(httpPort, () => {
    console.log(`Server running on port ${httpPort}`);
  });
}

start();
