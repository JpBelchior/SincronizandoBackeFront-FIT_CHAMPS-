import express from "express";
import type { Express } from "express";
import { routerSetup } from "./routes/routerSteup";
import envconfig from "./config/envconfig";

function getExpressApp(): Express {
  const app = express();
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
