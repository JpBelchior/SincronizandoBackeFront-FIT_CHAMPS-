import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Router as ExpressRouter } from "express";
import { userControllerInstance } from "../../controllers/users";

const router = ExpressRouter();

router.post("/create", async (req: ExpressRequest, res: ExpressResponse) => {
  const body = req.body;
  const nome = body.nome;
  const email = body.email;
  const createdUser = await userControllerInstance.create(nome, email);

  res.json({ message: "hello", user: createdUser });
  return;
});

export default router;
