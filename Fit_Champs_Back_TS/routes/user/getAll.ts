import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Router as ExpressRouter } from "express";
import { userControllerInstance } from "../../controllers/users";

const router = ExpressRouter();

router.get("/getAll", async (req: ExpressRequest, res: ExpressResponse) => {
  const userList = await userControllerInstance.getAll();

  res.json({ message: "hello", userList: userList });
  return;
});

export default router;
