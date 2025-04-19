import { useState } from "react";
import { NavLink } from "react-router-dom";
import icone from "../images/icone.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" w-[100vw]  bg-gradient-to-br from-slate-950 to-slate-700  flex flex-col items-center justify-center p-6 rounded-md shadow-2xl">
      {/* Logo Header */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={icone}
            alt="Fit Champs Logo"
            className="h-12 w-12 animate-pulse"
          />
          <h1 className="text-4xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Fit Champs
          </h1>
        </div>
        <p className="text-blue-300 text-lg font-medium">
          Supere seus limites!
        </p>
      </div>

      {/* Login Card - Wider */}
      <div className="w-full max-w-2xl bg-gradient-to-b from-sky-950 to-sky-950/90 rounded-2xl shadow-2xl overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500"></div>

        <div className="p-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Login
          </h2>

          <form className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-blue-200 font-medium mb-2">
                Usuário
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-sky-900/30 border border-sky-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="Digite seu nome de usuário"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-blue-200 font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 bg-sky-900/30 border border-sky-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Options Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-blue-200"
                >
                  Lembrar-me
                </label>
              </div>
              <div>
                <button className="text-sm text-blue-400 hover:text-blue-200">
                  <NavLink to="/ForgotPassword">Esqueci a senha</NavLink>
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <NavLink to="/Home" className="block w-full">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  ENTRAR
                </button>
              </NavLink>
            </div>

            {/* Signup Link - Two Column Layout */}
            <div className=" gap-4 mt-6">
              <div className="text-center p-4 border border-sky-800 rounded-lg bg-sky-900/20">
                <p className="text-blue-200 mb-2">Novo por aqui?</p>
                <NavLink
                  to="/Cadastro"
                  className="block w-full bg-sky-900 hover:bg-sky-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Criar conta
                </NavLink>
              </div>
            </div>
          </form>

          {/* Fitness Motivation Banner */}
          <div className="mt-8 bg-sky-900 border border-sky-800 rounded-lg p-4 text-center">
            <p className="text-blue-200 italic">
              "O único treino ruim é aquele que você não fez."
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-blue-400 text-sm">
          © 2025 Fit Champs - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
