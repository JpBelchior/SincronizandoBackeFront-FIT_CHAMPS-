import React, { useState } from "react";
import { Edit } from "lucide-react";

const EditProfileModal = ({ userData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: userData.nome || "",
    email: userData.email || "",
    telefone: userData.telefone || "",
    idade: userData.idade || "",
    altura: userData.altura || "",
    peso: userData.peso || "",
    cidade: userData.cidade || "",
    foto: userData.foto,
    posicaoRank: userData.posicaoRank,
    sexo: userData.sexo,
    imc: userData.imc,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClasses =
    "w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg p-6 border border-slate-600">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Edit className="mr-2 text-blue-400" size={20} />
            Atualizar Perfil
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white bg-slate-700 rounded-full p-1"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  className="block text-slate-300 text-sm font-medium mb-1"
                  htmlFor="nome"
                >
                  Nome
                </label>
                <input
                  className={inputClasses}
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-slate-300 text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={inputClasses}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  className="block text-slate-300 text-sm font-medium mb-1"
                  htmlFor="telefone"
                >
                  Telefone
                </label>
                <input
                  className={inputClasses}
                  id="telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="block text-slate-300 text-sm font-medium mb-1"
                  htmlFor="cidade"
                >
                  Cidade
                </label>
                <input
                  className={inputClasses}
                  id="cidade"
                  name="cidade"
                  type="text"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-slate-300 text-sm font-medium mb-1"
                  htmlFor="idade"
                >
                  Idade
                </label>
                <input
                  className={inputClasses}
                  id="idade"
                  name="idade"
                  type="number"
                  value={formData.idade}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className="block text-slate-300 text-sm font-medium mb-1"
                  htmlFor="altura"
                >
                  Altura (cm)
                </label>
                <input
                  className={inputClasses}
                  id="altura"
                  name="altura"
                  type="number"
                  value={formData.altura}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className="block text-slate-300 text-sm font-medium mb-1"
                  htmlFor="peso"
                >
                  Peso (kg)
                </label>
                <input
                  className={inputClasses}
                  id="peso"
                  name="peso"
                  type="number"
                  value={formData.peso}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="bg-slate-700 text-white font-medium py-2 px-5 rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white font-medium py-2 px-5 rounded-lg hover:opacity-90 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
