// routes/auth/login.ts
import { Request, Response, Router } from "express";
import { userControllerInstance } from "../../controllers/users";

const router = Router();

// Rota de login
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    // Validações básicas
    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "Email e senha são campos obrigatórios",
      });
    }

    const result = await userControllerInstance.login(email, senha);

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      usuario: result.user,
      token: result.token,
    });
  } catch (error: any) {
    return res.status(401).json({ mensagem: error.message });
  }
});

export default router;
