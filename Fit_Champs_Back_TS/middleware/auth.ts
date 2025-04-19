// middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Verificar se o header de autorização existe
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  // Verificar se o formato do token é válido
  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({ message: "Erro no formato do token" });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Formato do token inválido" });
  }

  // Verificar validade do token
  const decoded = AuthService.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }

  // Salvar o ID do usuário na requisição
  req.userId = decoded.id;

  return next();
};
