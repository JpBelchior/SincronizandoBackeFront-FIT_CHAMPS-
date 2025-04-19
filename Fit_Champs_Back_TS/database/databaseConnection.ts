export class Data {}
let databaseConnection: Data | null = null;
export function getDatabaseConneciton(): Data {
  if (!databaseConnection) {
    databaseConnection = new Data();
  }

  return Data;
}
