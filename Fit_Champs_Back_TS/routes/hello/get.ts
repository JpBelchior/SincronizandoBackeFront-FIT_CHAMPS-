import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Router as ExpressRouter } from "express";

const router = ExpressRouter();

router.get("/say-hello", (req: ExpressRequest, res: ExpressResponse) => {
  res.json({ message: "hello" });
  return;
});

export default router;
