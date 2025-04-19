// routes/routerSteup.ts (modificado)
import type { Express } from "express";
import { Router as ExpressRouter } from "express";

import helloGetRouter from "./hello/get";
import usersPostRoute from "./user/post";
import usersGetRoute from "./user/get";
import usersPutRoute from "./user/put";
import authLoginRoute from "./auth/login"; // Corrigido: importação do login
// Em setupAuthRoutes no routes/routerSteup.ts
import authValidateRoute from "./auth/validate";
import usersDeleteRoute from "./user/delete";

function setupAuthRoutes(app: Express) {
  const authRouter = ExpressRouter();

  authRouter.use(authLoginRoute);
  authRouter.use(authValidateRoute);
  app.use("/auth", authRouter);
}

function setupUserRoutes(app: Express) {
  const userRouter = ExpressRouter();

  userRouter.use(usersPostRoute);
  userRouter.use(usersGetRoute);
  userRouter.use(usersPutRoute);
  userRouter.use(usersDeleteRoute);
  app.use("/user", userRouter);
}

function setupHelloRoutes(app: Express) {
  const helloRouter = ExpressRouter();

  helloRouter.use(helloGetRouter);
  app.use("/hello", helloRouter);
}

export function routerSetup(app: Express) {
  setupHelloRoutes(app);
  setupUserRoutes(app);
  setupAuthRoutes(app); // Nova função para rotas de autenticação
}
