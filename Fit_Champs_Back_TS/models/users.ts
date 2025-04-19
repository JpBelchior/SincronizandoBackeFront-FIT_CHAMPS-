export type Users = {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  idade?: number;
  altura?: number;
  peso?: number;
  cidade?: string;
  sexo?: string;
  imc?: number;
  dataCriacao?: Date;
  ultimoLogin?: Date;
};
export type AuthResponse = {
  user: Omit<Users, "senha">;
  token: string;
};

// Tipo para requisições de login
export type LoginRequest = {
  email: string;
  senha: string;
};
