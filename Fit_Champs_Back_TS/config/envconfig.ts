import dotenv from "dotenv";

class EnvConfig {
  private envPath: string;

  constructor() {
    this.envPath = "../.env";
  }

  /**
   * Loads enviorement variables from .env file if not in development enviorement
   */
  private loadEnv(): void {
    dotenv.config({
      path: this.envPath,
    });
  }

  public httpPort(): number {
    this.loadEnv();
    return parseInt(process.env.HTTP_PORT || "3000");
  }
}

export default new EnvConfig();
