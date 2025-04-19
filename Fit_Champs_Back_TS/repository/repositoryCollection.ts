import { Data, getDatabaseConneciton } from "../database/databaseConnection";
import { IUserRepo, UserRepoMock } from "./users";

class ReporitoryCollection {
  userRepo: IUserRepo;

  constructor() {
    const databaseConnection = getDatabaseConneciton();
    this.userRepo = new UserRepoMock();
  }
}

export const reporitoryCollectionInstance = new ReporitoryCollection();
