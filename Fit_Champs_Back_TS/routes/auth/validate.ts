// routes/auth/validate.ts
import { Request, Response, Router } from "express";
import { authMiddleware, AuthRequest } from "../../middleware/auth";

const router = Router();

router.get("/validate", (req: Request, res: Response) => {
  authMiddleware(req as AuthRequest, res, () => {
    const authReq = req as AuthRequest;

    // Se chegar aqui, o token é válido
    return res.status(200).json({
      success: true,
      message: "Token válido",
      userId: authReq.userId,
    });
  });
});

export default router;
