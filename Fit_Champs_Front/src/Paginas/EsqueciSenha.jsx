import React, { useState } from "react";
import { Link } from "react-router-dom";
import icone from "../images/icone.png";
import {
  Mail,
  KeySquare,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
  Info,
  Send,
  RefreshCw,
} from "lucide-react";

const ForgotPassword = () => {
  // Estados para os diferentes passos do processo
  const [step, setStep] = useState("email"); // email, verification, reset, success
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    color: "",
  });

  // Estado para notificações
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

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

  // Função para solicitar código de verificação
  const requestVerificationCode = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de atraso na resposta do servidor
    setTimeout(() => {
      // Validar formato de email
      if (!email.includes("@") || !email.includes(".")) {
        showNotification("Por favor, insira um email válido", "error");
        setLoading(false);
        return;
      }

      // Aqui você faria uma chamada de API para enviar o código para o email
      console.log("Enviando código para:", email);
      setLoading(false);
      setStep("verification");
      showNotification(
        "Código de verificação enviado para seu email!",
        "success"
      );
    }, 1500);
  };

  // Função para verificar o código
  const verifyCode = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de atraso na resposta do servidor
    setTimeout(() => {
      // Validar código (neste exemplo, qualquer código de 6 dígitos é válido)
      if (verificationCode.length !== 6 || isNaN(Number(verificationCode))) {
        showNotification("Código de verificação inválido", "error");
        setLoading(false);
        return;
      }

      // Aqui você faria uma chamada de API para verificar o código
      console.log("Verificando código:", verificationCode);
      setLoading(false);
      setStep("reset");
    }, 1500);
  };

  // Função para redefinir a senha
  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de atraso na resposta do servidor
    setTimeout(() => {
      // Validar senhas
      if (newPassword !== confirmPassword) {
        showNotification("As senhas não coincidem", "error");
        setLoading(false);
        return;
      }

      // Validar força da senha
      if (passwordStrength.score < 50) {
        showNotification("Escolha uma senha mais forte", "error");
        setLoading(false);
        return;
      }

      // Aqui você faria uma chamada de API para redefinir a senha
      console.log("Redefinindo senha para:", email);
      setLoading(false);
      setStep("success");
    }, 1500);
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

  // Toggle para mostrar/esconder senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

  // Manipulador para o campo de verificação - limitar a 6 dígitos numéricos
  const handleVerificationChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setVerificationCode(value);
    }
  };

  // Manipulador para o campo de senha
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    calculatePasswordStrength(value);
  };

  // Renderização diferente dependendo do passo atual
  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 p-6 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-2xl shadow-xl p-6 w-full max-w-lg mx-auto mb-6 border border-indigo-500/30 backdrop-blur-sm">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text text-transparent">
              Fit Champs
            </h1>
            <img src={icone} alt="icone" className="h-10 w-10" />
          </div>
          <span className="text-blue-200 mt-2 block">Recuperação de Senha</span>
        </div>
      </div>

      {/* Formulário */}
      <div className="bg-gradient-to-br from-slate-800/90 to-indigo-900/20 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full max-w-lg mx-auto border border-indigo-500/20">
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

        {/* Step 1: Email Input */}
        {step === "email" && (
          <>
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent mb-6 flex items-center justify-center">
              <KeySquare className="mr-2 text-blue-400" size={28} />
              Recuperar Senha
            </h2>
            <p className="text-blue-200 text-center mb-6">
              Digite seu email para receber um código de verificação
            </p>

            <form onSubmit={requestVerificationCode} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  className={getFieldStyle("email")}
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>

              <div className="flex justify-between items-center mt-6">
                <Link
                  to="/"
                  className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-3 px-6 rounded-xl flex items-center gap-2 hover:from-slate-600 hover:to-slate-700 transition-colors shadow-md transform hover:scale-105"
                >
                  <ArrowLeft size={18} />
                  <span>Voltar para Login</span>
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-colors shadow-lg transform hover:scale-105 font-medium flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={18} />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Enviar Código</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}

        {/* Step 2: Verification Code */}
        {step === "verification" && (
          <>
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent mb-6 flex items-center justify-center">
              <KeySquare className="mr-2 text-blue-400" size={28} />
              Código de Verificação
            </h2>
            <p className="text-blue-200 text-center mb-6">
              Digite o código de 6 dígitos enviado para {email}
            </p>

            <form onSubmit={verifyCode} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="verificationCode"
                  className="block font-medium text-blue-200 flex items-center"
                >
                  <KeySquare className="mr-2 text-blue-300" size={16} />
                  Código de Verificação
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={handleVerificationChange}
                  onFocus={() => handleFocus("verificationCode")}
                  onBlur={handleBlur}
                  className={`${getFieldStyle(
                    "verificationCode"
                  )} text-center tracking-widest text-lg`}
                  placeholder="000000"
                  required
                  maxLength={6}
                />
                <div className="flex justify-between text-sm mt-2">
                  <button
                    type="button"
                    className="text-blue-300 hover:text-blue-100 transition-colors flex items-center"
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                        showNotification(
                          "Novo código enviado para seu email!",
                          "success"
                        );
                      }, 1500);
                    }}
                  >
                    <RefreshCw size={14} className="mr-1" />
                    Reenviar código
                  </button>
                  <span className="text-slate-400">Validade: 10 minutos</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-3 px-6 rounded-xl flex items-center gap-2 hover:from-slate-600 hover:to-slate-700 transition-colors shadow-md transform hover:scale-105"
                >
                  <ArrowLeft size={18} />
                  <span>Voltar</span>
                </button>
                <button
                  type="submit"
                  disabled={loading || verificationCode.length !== 6}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-colors shadow-lg transform hover:scale-105 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={18} />
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <span>Verificar</span>
                  )}
                </button>
              </div>
            </form>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === "reset" && (
          <>
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent mb-6 flex items-center justify-center">
              <KeySquare className="mr-2 text-blue-400" size={28} />
              Nova Senha
            </h2>
            <p className="text-blue-200 text-center mb-6">
              Crie uma nova senha para sua conta
            </p>

            <form onSubmit={resetPassword} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="block font-medium text-blue-200 flex items-center"
                >
                  <KeySquare className="mr-2 text-blue-300" size={16} />
                  Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    onFocus={() => handleFocus("newPassword")}
                    onBlur={handleBlur}
                    className={getFieldStyle("newPassword")}
                    placeholder="Digite sua nova senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
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
                  <KeySquare className="mr-2 text-blue-300" size={16} />
                  Confirmar Nova Senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={handleBlur}
                  className={getFieldStyle("confirmPassword")}
                  placeholder="Confirme sua nova senha"
                  required
                />
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={() => setStep("verification")}
                  className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-3 px-6 rounded-xl flex items-center gap-2 hover:from-slate-600 hover:to-slate-700 transition-colors shadow-md transform hover:scale-105"
                >
                  <ArrowLeft size={18} />
                  <span>Voltar</span>
                </button>
                <button
                  type="submit"
                  disabled={loading || !newPassword || !confirmPassword}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-colors shadow-lg transform hover:scale-105 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={18} />
                      <span>Processando...</span>
                    </>
                  ) : (
                    <span>Redefinir Senha</span>
                  )}
                </button>
              </div>
            </form>
          </>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div className="text-center py-8">
            <div className="bg-green-900/30 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-green-500/30">
              <CheckCircle className="text-green-400" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Senha Redefinida com Sucesso!
            </h2>
            <p className="text-slate-300 mb-8">
              Sua senha foi alterada com sucesso. Agora você pode fazer login
              com sua nova senha.
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-colors shadow-lg transform hover:scale-105 inline-block font-medium"
            >
              Voltar para Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
