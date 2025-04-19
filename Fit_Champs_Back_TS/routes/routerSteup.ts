import type { Express } from "express";
import { Router as ExpressRouter } from "express";

import helloGetRouter from "./hello/get";

import usersPostRoute from "./user/create";
import usersGetRoute from "./user/getAll";

function setupUserRoutes(app: Express) {
  const userRouter = ExpressRouter();

  userRouter.use(usersPostRoute);
  userRouter.use(usersGetRoute);
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
}
