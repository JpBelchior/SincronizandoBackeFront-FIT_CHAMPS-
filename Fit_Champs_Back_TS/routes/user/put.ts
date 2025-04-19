import { Request, Response, Router } from "express";
import { userControllerInstance } from "../../controllers/users";
import { Users } from "../../models/users";
import { authMiddleware, AuthRequest } from "../../middleware/auth";

const router = Router();

// Usando o middleware de autenticação em uma rota específica
router.put("/:id", (req: Request, res: Response, next) => {
  // Primeiro chamamos o middleware de autenticação
  authMiddleware(req as AuthRequest, res, () => {
    // Este código só será executado se o middleware permitir (autenticação válida)
    const authReq = req as AuthRequest;

    // Encapsulamos a lógica assíncrona em uma função imediatamente invocada
    (async () => {
      try {
        const userId = req.params.id;

        // Verificação de segurança: Usuários só podem atualizar seus próprios perfis
        if (authReq.userId !== userId) {
          return res.status(403).json({
            success: false,
            message: "Você não tem permissão para atualizar este perfil",
          });
        }

        const userData = req.body as Partial<Users>;

        // Impedir atualizações de senha através deste endpoint
        if (userData.senha) {
          delete userData.senha;
        }

        // Atualizar dados do usuário
        const updatedUser = await userControllerInstance.updateUser(
          userId,
          userData
        );

        return res.status(200).json({
          success: true,
          message: "Perfil atualizado com sucesso",
          data: updatedUser,
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
