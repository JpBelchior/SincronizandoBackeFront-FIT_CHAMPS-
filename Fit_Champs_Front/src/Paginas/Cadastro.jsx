import React, { useState } from "react";
import icone from "../images/icone.png";
import { Link } from "react-router-dom";
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  UserCheck,
  Info,
  ArrowLeft,
} from "lucide-react";

const Cadastro = () => {
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    phone: "",
    password: "",
    confirmPassword: "",
    cidade: "",
    sexo: "", // Default value
    altura: "",
  });

  // Estado para notificações
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  // Estado para a força da senha
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    color: "",
  });

  // Estados para mostrar/esconder senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estado para rastrear o campo em foco
  const [focusedField, setFocusedField] = useState(null);

  // Função para atualizar os dados do formulário
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Formatar telefone
    if (id === "phone") {
      let formattedPhone = value.replace(/\D/g, "");
      if (formattedPhone.length > 0) {
        formattedPhone = "(" + formattedPhone;
        if (formattedPhone.length > 3) {
          formattedPhone =
            formattedPhone.substring(0, 3) + ") " + formattedPhone.substring(3);
        }
        if (formattedPhone.length > 10) {
          formattedPhone =
            formattedPhone.substring(0, 10) +
            "-" +
            formattedPhone.substring(10);
        }
        if (formattedPhone.length > 15) {
          formattedPhone = formattedPhone.substring(0, 15);
        }
      }

      setFormData({ ...formData, [id]: formattedPhone });
    } else {
      setFormData({ ...formData, [id]: value });
    }

    // Calcular força da senha se o campo for password
    if (id === "password") {
      calculatePasswordStrength(value);
    }
  };

  // Novas funções para lidar com o foco
  const handleFocus = (fieldId) => {
    setFocusedField(fieldId);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Função para determinar a classe de estilo do campo
  const getFieldStyle = (fieldId) => {
    const baseStyle =
      "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 bg-slate-700 text-white border";

    if (fieldId === focusedField) {
      return `${baseStyle} border-blue-500 ring-blue-500/50 shadow-lg transform scale-[1.02]`;
    }

    return `${baseStyle} border-slate-600 hover:border-slate-500 focus:border-blue-500`;
  };

  // Função para calcular a força da senha
  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    let color = "";
    if (score <= 25) color = "bg-red-500";
    else if (score <= 50) color = "bg-yellow-500";
    else if (score <= 75) color = "bg-green-500";
    else color = "bg-blue-500";

    setPasswordStrength({ score, color });
  };

  // Função para mostrar notificação
  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
      visible: true,
    });

    // Esconder notificação após 5 segundos
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  // Função para validar e enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação das senhas
    if (formData.password !== formData.confirmPassword) {
      showNotification("As senhas não coincidem!", "error");
      return;
    }

    // Validação da força da senha
    if (formData.password.length < 8) {
      showNotification("A senha deve ter pelo menos 8 caracteres!", "error");
      return;
    }

    // Preparar dados para envio (removendo confirmPassword)
    const dataToSubmit = {
      ...formData,
      confirmPassword: undefined,
    };

    // Aqui você enviaria os dados para o servidor (API)
    console.log("Dados enviados:", dataToSubmit);
    showNotification("Cadastro realizado com sucesso!", "success");

    // Limpar formulário
    setFormData({
      name: "",
      email: "",
      age: "",
      weight: "",
      phone: "",
      password: "",
      confirmPassword: "",
      altura: "",
      cidade: "",
      sexo: "",
    });

    setPasswordStrength({ score: 0, color: "" });
  };

  // Toggle para mostrar/esconder senha
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 p-6 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-auto mb-6 border border-indigo-500/30 backdrop-blur-sm">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text text-transparent">
              Fit Champs
            </h1>
            <img src={icone} alt="icone" className="h-10 w-10" />
          </div>
          <span className="text-blue-200 mt-2 block">
            Melhorando sua saúde e qualidade de vida
          </span>
        </div>
      </div>

      {/* Formulário de cadastro */}
      <div className="bg-gradient-to-br from-slate-800/90 to-indigo-900/20 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full max-w-4xl mx-auto border border-indigo-500/20">
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent mb-6 flex items-center justify-center">
          <UserCheck className="mr-2 text-blue-400" size={28} />
          Cadastro de Usuário
        </h1>

        {notification.visible && (
          <div
            className={`p-4 mb-6 text-center rounded-xl shadow-lg ${
              notification.type === "error"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
                : "bg-gradient-to-r from-green-600 to-green-700 text-white"
            } transform animate-pulse`}
          >
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block font-medium text-blue-200 flex items-center"
              >
                <User className="mr-2 text-blue-300" size={16} />
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                className={getFieldStyle("name")}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block font-medium text-blue-200 flex items-center"
              >
                <Mail className="mr-2 text-blue-300" size={16} />
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                className={getFieldStyle("email")}
                placeholder="seu.email@exemplo.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="cidade"
                className="block font-medium text-blue-200 flex items-center"
              >
                <MapPin className="mr-2 text-blue-300" size={16} />
                Cidade
              </label>
              <input
                type="text"
                id="cidade"
                value={formData.cidade}
                onChange={handleChange}
                onFocus={() => handleFocus("cidade")}
                onBlur={handleBlur}
                className={getFieldStyle("cidade")}
                placeholder="Sua cidade"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sexo"
                className="block font-medium text-blue-200 flex items-center"
              >
                <User className="mr-2 text-blue-300" size={16} />
                Sexo
              </label>
              <select
                id="sexo"
                value={formData.sexo}
                onChange={handleChange}
                onFocus={() => handleFocus("sexo")}
                onBlur={handleBlur}
                className={getFieldStyle("sexo")}
                required
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="age"
                className="block font-medium text-blue-200 flex items-center"
              >
                <Info className="mr-2 text-blue-300" size={16} />
                Idade
              </label>
              <input
                type="number"
                id="age"
                min="12"
                max="100"
                value={formData.age}
                onChange={handleChange}
                onFocus={() => handleFocus("age")}
                onBlur={handleBlur}
                className={getFieldStyle("age")}
                placeholder="Sua idade"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block font-medium text-blue-200 flex items-center"
              >
                <Phone className="mr-2 text-blue-300" size={16} />
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus("phone")}
                onBlur={handleBlur}
                className={getFieldStyle("phone")}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="altura"
                className="block font-medium text-blue-200 flex items-center"
              >
                <Info className="mr-2 text-blue-300" size={16} />
                Altura (cm)
              </label>
              <input
                type="number"
                id="altura"
                step="1"
                min="1"
                max="220"
                value={formData.altura}
                onChange={handleChange}
                onFocus={() => handleFocus("altura")}
                onBlur={handleBlur}
                className={getFieldStyle("altura")}
                placeholder="Sua altura em cm"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="weight"
                className="block font-medium text-blue-200 flex items-center"
              >
                <Info className="mr-2 text-blue-300" size={16} />
                Peso (kg)
              </label>
              <input
                type="number"
                id="weight"
                step="0.1"
                min="1"
                max="300"
                value={formData.weight}
                onChange={handleChange}
                onFocus={() => handleFocus("weight")}
                onBlur={handleBlur}
                className={getFieldStyle("weight")}
                placeholder="Seu peso em kg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-medium text-blue-200 flex items-center"
              >
                <Lock className="mr-2 text-blue-300" size={16} />
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={handleBlur}
                  className={getFieldStyle("password")}
                  placeholder="Crie uma senha forte"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {/* Indicador de força da senha */}
              <div className="h-1 mt-2 rounded-full bg-slate-600">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.score}%` }}
                ></div>
              </div>
              {/* Tooltip com dicas de senha */}
              <div className="mt-1 text-xs text-slate-400 flex items-center bg-slate-800/50 p-2 rounded-lg">
                <Info className="text-blue-300 mr-1" size={14} />
                <span>
                  A senha deve ter pelo menos 8 caracteres, incluindo
                  maiúsculas, números e símbolos
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block font-medium text-blue-200 flex items-center"
              >
                <Lock className="mr-2 text-blue-300" size={16} />
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={handleBlur}
                  className={getFieldStyle("confirmPassword")}
                  placeholder="Confirme sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Link
              to="/"
              className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-3 px-6 rounded-xl flex items-center gap-2 hover:from-slate-600 hover:to-slate-700 transition-colors shadow-md transform hover:scale-105"
            >
              <ArrowLeft size={18} />
              <span>Voltar para Login</span>
            </Link>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-colors shadow-lg transform hover:scale-105 font-medium"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
