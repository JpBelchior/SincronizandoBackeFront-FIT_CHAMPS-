// controllers/users.ts
import { IUserRepo } from "../repository/users";
import { reporitoryCollectionInstance } from "../repository/repositoryCollection";
import { Users } from "../models/users";
import { AuthService } from "../services/authService";

class UserController {
  private userRepo: IUserRepo;

  constructor() {
    this.userRepo = reporitoryCollectionInstance.userRepo;
  }

  async deleteUser(id: string): Promise<void> {
    // Check if user exists
    const existingUser = await this.userRepo.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Delete user
    await this.userRepo.delete(id);
  }
  async register(
    userData: Omit<Users, "id">
  ): Promise<{ user: Omit<Users, "senha">; token: string }> {
    // Verificar se e-mail já existe
    const existingUser = await this.userRepo.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    // Calcular IMC se altura e peso foram fornecidos
    let imc = undefined;
    if (userData.altura && userData.peso) {
      const alturaMetros = userData.altura / 100;
      imc = userData.peso / (alturaMetros * alturaMetros);
    }

    // Criar o novo usuário
    const newUser = await this.userRepo.create({
      ...userData,
      imc,
    });

    // Gerar token
    const token = AuthService.generateToken(newUser.id!);

    return {
      user: newUser,
      token,
    };
  }

  async login(
    email: string,
    senha: string
  ): Promise<{ user: Omit<Users, "senha">; token: string }> {
    // Buscar usuário por e-mail
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // Verificar senha
    const isPasswordValid = await AuthService.verifyPassword(senha, user.senha);
    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    // Atualizar último login
    await this.userRepo.updateLastLogin(user.id!);

    // Gerar token
    const token = AuthService.generateToken(user.id!);

    // Retornar usuário sem a senha
    const { senha: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword as Users,
      token,
    };
  }

  async getAll(): Promise<Users[]> {
    const users = await this.userRepo.getAll();
    return users;
  }

  async getUserById(id: string): Promise<Users | null> {
    return this.userRepo.findById(id);
  }

  async updateUser(id: string, data: Partial<Users>): Promise<Users> {
    // Verificar se o usuário existe
    const existingUser = await this.userRepo.findById(id);
    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    // Se o e-mail estiver sendo atualizado, verificar se já existe
    if (data.email && data.email !== existingUser.email) {
      const userWithSameEmail = await this.userRepo.findByEmail(data.email);
      if (userWithSameEmail) {
        throw new Error("Email já cadastrado para outro usuário");
      }
    }

    // Atualizar os dados do usuário
    return this.userRepo.update(id, data);
  }
}

export const userControllerInstance = new UserController();
