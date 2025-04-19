import { IUserRepo } from "../repository/users";
import { reporitoryCollectionInstance } from "../repository/repositoryCollection";
import { Users } from "../models/users";

class UserController {
  private userRepo: IUserRepo;

  constructor() {
    this.userRepo = reporitoryCollectionInstance.userRepo;
  }

  async create(nome: String, email: String): Promise<Users> {
    // checar email
    // cher nome de usuario

    const createdUser = await this.userRepo.create(nome, email);
    return createdUser;
  }

  async getAll(): Promise<Users[]> {
    const users = await this.userRepo.getAll();
    return users;
  }
}

export const userControllerInstance = new UserController();
