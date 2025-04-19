import { Data } from "../database/databaseConnection";
import { Users } from "../models/users";
import { AuthService } from "../services/authService";

export interface IUserRepo {
  create(user: Users): Promise<Users>;
  getAll(): Promise<Users[]>;
  findByEmail(email: string): Promise<Users | null>;
  findById(id: string): Promise<Users | null>;
  updateLastLogin(id: string): Promise<void>;
  update(id: string, data: Partial<Users>): Promise<Users>;
}

export class UserRepoMock implements IUserRepo {
  private users: Users[];
  private nextId: number;

  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  async create(user: Users): Promise<Users> {
    // Hash da senha antes de armazenar
    const hashedPassword = await AuthService.hashPassword(user.senha);

    const newUser = {
      ...user,
      id: this.nextId.toString(),
      senha: hashedPassword,
      dataCriacao: new Date(),
      ultimoLogin: new Date(),
    };

    this.users.push(newUser);
    this.nextId++;

    // Retorna o usuário sem a senha
    const { senha, ...userWithoutPassword } = newUser;
    return userWithoutPassword as Users;
  }

  async getAll(): Promise<Users[]> {
    // Retorna todos os usuários sem as senhas
    return this.users.map((user) => {
      const { senha, ...userWithoutPassword } = user;
      return userWithoutPassword as Users;
    });
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }

  async findById(id: string): Promise<Users | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    // Retorna o usuário sem a senha
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword as Users;
  }

  async updateLastLogin(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex >= 0) {
      this.users[userIndex].ultimoLogin = new Date();
    }
  }
  async update(id: string, data: Partial<Users>): Promise<Users> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      throw new Error("Usuário não encontrado");
    }

    // Não permitir atualização de senha por esta rota (deve ter uma rota específica)
    const updateData = { ...data };
    if (updateData.senha) {
      delete updateData.senha;
    }

    // Atualizar dados
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData,
    };

    // Recalcular IMC se altura ou peso foram atualizados
    if (updateData.altura || updateData.peso) {
      const { altura, peso } = this.users[userIndex];
      if (altura && peso) {
        const alturaMetros = altura / 100;
        this.users[userIndex].imc = peso / (alturaMetros * alturaMetros);
      }
    }

    // Retornar usuário sem a senha
    const { senha, ...userWithoutPassword } = this.users[userIndex];
    return userWithoutPassword as Users;
  }
}
