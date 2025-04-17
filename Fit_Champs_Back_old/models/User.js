// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
  },
  senha: {
    type: String,
    required: [true, "Senha é obrigatória"],
    minlength: [8, "A senha deve ter pelo menos 8 caracteres"],
  },
  telefone: {
    type: String,
    trim: true,
  },
  idade: {
    type: Number,
    min: [12, "Idade mínima de 12 anos"],
    max: [100, "Idade máxima de 100 anos"],
  },
  altura: {
    type: Number,
    min: [100, "Altura mínima de 100 cm"],
    max: [220, "Altura máxima de 220 cm"],
  },
  peso: {
    type: Number,
    min: [30, "Peso mínimo de 30 kg"],
    max: [300, "Peso máximo de 300 kg"],
  },
  cidade: {
    type: String,
    trim: true,
  },
  sexo: {
    type: String,
    enum: ["masculino", "feminino"],
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  IMC: {
    type: Number,
    min: [10, "IMC mínimo de 10"],
  },
});

// Middleware para criptografar a senha antes de salvar
UserSchema.pre("save", async function (next) {
  // Só criptografa a senha se ela foi modificada (ou é nova)
  if (!this.isModified("senha")) return next();

  try {
    // Gera um salt
    const salt = await bcrypt.genSalt(10);
    // Criptografa a senha com o salt
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
UserSchema.methods.compararSenha = async function (senhaInformada) {
  return await bcrypt.compare(senhaInformada, this.senha);
};

module.exports = mongoose.model("User", UserSchema);
