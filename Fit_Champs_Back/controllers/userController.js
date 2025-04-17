// controllers/userController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Gerar token JWT
const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expira em 30 dias
  });
};

// @desc    Registrar um novo usuário
// @route   POST /api/users/registro
// @access  Public
exports.registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, telefone, idade, altura, peso, cidade, sexo } =
      req.body;

    // Verificar se o email já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ mensagem: "Este email já está cadastrado" });
    }

    // Criar novo usuário
    const usuario = await User.create({
      nome,
      email,
      senha,
      telefone,
      idade,
      altura,
      peso,
      cidade,
      sexo,
      IMC: peso / ((altura / 100) * (altura / 100)), // Cálculo do IMC
    });

    if (usuario) {
      res.status(201).json({
        _id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        token: gerarToken(usuario._id),
      });
    }
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({
      mensagem: "Erro ao registrar usuário",
      erro: error.message,
    });
  }
};

// @desc    Autenticar usuário e obter token
// @route   POST /api/users/login
// @access  Public
exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ mensagem: "Email ou senha incorretos" });
    }

    // Verificar se a senha está correta
    const senhaCorreta = await usuario.compararSenha(senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Email ou senha incorretos" });
    }

    res.json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      idade: usuario.idade,
      altura: usuario.altura,
      peso: usuario.peso,
      telefone: usuario.telefone,
      cidade: usuario.cidade,
      sexo: usuario.sexo,
      IMC: usuario.IMC,
      token: gerarToken(usuario._id),
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({
      mensagem: "Erro ao fazer login",
      erro: error.message,
    });
  }
};

// @desc    Obter perfil do usuário
// @route   GET /api/users/perfil
// @access  Private
exports.getPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario._id).select("-senha");

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error("Erro ao obter perfil:", error);
    res.status(500).json({
      mensagem: "Erro ao obter perfil",
      erro: error.message,
    });
  }
};

// @desc    Atualizar perfil do usuário
// @route   PUT /api/users/perfil
// @access  Private
exports.atualizarPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario._id);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    usuario.nome = req.body.nome || usuario.nome;
    usuario.email = req.body.email || usuario.email;
    usuario.telefone = req.body.telefone || usuario.telefone;
    usuario.idade = req.body.idade || usuario.idade;
    usuario.altura = req.body.altura || usuario.altura;
    usuario.peso = req.body.peso || usuario.peso;
    usuario.cidade = req.body.cidade || usuario.cidade;
    usuario.sexo = req.body.sexo || usuario.sexo;
    usuario.IMC =
      req.body.peso / ((req.body.altura / 100) * (req.body.altura / 100)); // Atualizar IMC

    // Atualizar senha se fornecida
    if (req.body.senha) {
      usuario.senha = req.body.senha;
    }

    const usuarioAtualizado = await usuario.save();

    res.json({
      _id: usuarioAtualizado._id,
      nome: usuarioAtualizado.nome,
      email: usuarioAtualizado.email,
      idade: usuarioAtualizado.idade,
      altura: usuarioAtualizado.altura,
      peso: usuarioAtualizado.peso,
      telefone: usuarioAtualizado.telefone,
      cidade: usuarioAtualizado.cidade,
      sexo: usuarioAtualizado.sexo,
      IMC: usuarioAtualizado.IMC,
      token: gerarToken(usuarioAtualizado._id),
    });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({
      mensagem: "Erro ao atualizar perfil",
      erro: error.message,
    });
  }
};
