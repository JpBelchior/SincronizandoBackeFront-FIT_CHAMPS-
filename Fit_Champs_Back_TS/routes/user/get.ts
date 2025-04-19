// routes/user/get.ts
import { Request, Response, Router } from "express";
import { userControllerInstance } from "../../controllers/users";
import { authMiddleware, AuthRequest } from "../../middleware/auth";

const router = Router();

// Rota para obter todos os usuários (protegida)
router.get("/", (req: Request, res: Response) => {
  // Encapsulamos a lógica assíncrona em uma função imediatamente invocada
  (async () => {
    try {
      const users = await userControllerInstance.getAll();

      return res.status(200).json({
        success: true,
        data: users,
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

// Rota para obter um usuário pelo ID (protegida)
router.get("/:id", (req: Request, res: Response) => {
  // Utilizamos o middleware de autenticação
  authMiddleware(req as AuthRequest, res, () => {
    const authReq = req as AuthRequest;

    // Encapsulamos a lógica assíncrona em uma função imediatamente invocada
    (async () => {
      try {
        const userId = req.params.id;

        // Verificação de segurança: Usuários só podem ver seus próprios perfis
        // (exceto em casos específicos como administradores, que podem ser implementados depois)
        if (authReq.userId !== userId) {
          return res.status(403).json({
            success: false,
            message: "Você não tem permissão para acessar este perfil",
          });
        }

        const user = await userControllerInstance.getUserById(userId);

        if (!user) {
          return res.status(404).json({
            success: false,
            message: "Usuário não encontrado",
          });
        }

        return res.status(200).json({
          success: true,
          data: user,
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
});

export default router;
