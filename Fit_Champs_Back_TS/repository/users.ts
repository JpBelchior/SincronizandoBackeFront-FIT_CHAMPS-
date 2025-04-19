import { Data } from "../database/databaseConnection";
import type { Users } from "../models/users";

export interface IUserRepo {
  create(nome: String, email: String): Promise<Users>;
  getAll(): Promise<Users[]>;
}

/** export class UserRepo implements IUserRepo {
     private databaseConnection: Data;

    constructor(connection: Data) {
        this.databaseConnection = connection;
    }
    }
    */

export class UserRepoMock implements IUserRepo {
  private users: Users[];

  constructor() {
    this.users = [];
  }

  async create(nome: String, email: String): Promise<Users> {
    this.users.push({ name: nome, email: email });
    return { name: nome, email: email };
  }

  async getAll(): Promise<Users[]> {
    return this.users;
  }
}
