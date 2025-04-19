// routes/auth/login.ts (corrigido)
import { Request, Response, Router } from "express";
import { userControllerInstance } from "../../controllers/users";
import { LoginRequest } from "../../models/users";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  // Encapsulamos a lógica assíncrona em uma função imediatamente invocada
  (async () => {
    try {
      const { email, senha } = req.body as LoginRequest;

      // Validações básicas
      if (!email || !senha) {
        return res.status(400).json({
          success: false,
          message: "Email e senha são obrigatórios",
        });
      }

      const result = await userControllerInstance.login(email, senha);

      return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        data: {
          user: result.user,
          token: result.token,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
      });
    }
  })().catch((err) => {
    console.error("Erro não tratado:", err);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  });
});

export default router;
