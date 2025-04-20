import mongoose from "mongoose";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

// Interface para a conexão do banco de dados
export interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
}

// Implementação de conexão MongoDB
export class MongoDBConnection implements DatabaseConnection {
  private static instance: MongoDBConnection;
  private isDbConnected: boolean = false;

  private constructor() {}

  // Padrão Singleton para garantir apenas uma instância da conexão
  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  // Conectar ao MongoDB
  public async connect(): Promise<void> {
    if (!this.isDbConnected) {
      try {
        const mongoURI =
          process.env.MONGO_URI || "mongodb://localhost:27017/fit_champs";

        // Opções de conexão
        const options = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as mongoose.ConnectOptions;

        await mongoose.connect(mongoURI, options);

        this.isDbConnected = true;
        console.log("Conexão com MongoDB estabelecida com sucesso!");

        // Listener para quando a conexão é fechada
        mongoose.connection.on("disconnected", () => {
          this.isDbConnected = false;
          console.log("Conexão MongoDB desconectada");
        });

        // Listener para erros de conexão
        mongoose.connection.on("error", (err) => {
          console.error("Erro na conexão MongoDB:", err);
        });
      } catch (error) {
        this.isDbConnected = false;
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error;
      }
    }
  }

  // Desconectar do MongoDB
  public async disconnect(): Promise<void> {
    if (this.isDbConnected) {
      await mongoose.disconnect();
      this.isDbConnected = false;
      console.log("Desconectado do MongoDB");
    }
  }

  // Verificar status da conexão
  public isConnected(): boolean {
    return this.isDbConnected;
  }
}

// Função para obter a conexão com o banco de dados
export function getDatabaseConnection(): DatabaseConnection {
  return MongoDBConnection.getInstance();
}
