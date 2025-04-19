import { Request, Response, Router } from "express";
import { userControllerInstance } from "../../controllers/users";
import { Users } from "../../models/users";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  // Encapsulamos a lógica assíncrona em uma função imediatamente invocada
  (async () => {
    try {
      const userData = req.body as Omit<Users, "id">;

      // Validações básicas
      if (!userData.nome || !userData.email || !userData.senha) {
        return res.status(400).json({
          success: false,
          message: "Nome, email e senha são obrigatórios",
        });
      }

      const result = await userControllerInstance.register(userData);

      return res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso",
        data: {
          user: result.user,
          token: result.token,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
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
