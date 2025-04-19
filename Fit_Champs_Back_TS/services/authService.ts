// services/authService.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../models/users";

dotenv.config();

const JWT_SECRET =
  process.env.JWT_SECRET || "sua_chave_secreta_para_tokens_jwt";
const SALT_ROUNDS = 10;

export class AuthService {
  // Hash de senha
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  // Verificar senha
  static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Gerar token JWT
  static generateToken(userId: string): string {
    return jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: "24h",
    });
  }

  // Verificar token JWT
  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}
