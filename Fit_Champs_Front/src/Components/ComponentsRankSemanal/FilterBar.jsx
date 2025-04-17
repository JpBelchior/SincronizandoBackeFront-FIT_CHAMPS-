import React from "react";
import { Filter, User } from "lucide-react";

const FilterBar = ({
  sexos,
  faixasEtarias,
  activeSexo,
  activeFaixaEtaria,
  setActiveSexo,
  setActiveFaixaEtaria,
  userInfo,
}) => {
  return (
    <>
      <div className="mb-4 bg-gradient-to-r from-slate-800 to-indigo-900/50 p-5 rounded-xl mx-auto max-w-md border border-indigo-700/30 shadow-lg">
        <div className="text-white font-semibold mb-3 flex items-center justify-center">
          <User className="mr-2 bg-blue-500/20 p-1 rounded-full" size={20} />
          <span>Seu Perfil</span>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="bg-gradient-to-r from-blue-600/40 to-blue-500/30 px-4 py-2 rounded-full text-white shadow-sm">
            <span className="font-medium">{userInfo.sexo}</span>
          </div>
          <div className="bg-gradient-to-r from-green-600/40 to-green-500/30 px-4 py-2 rounded-full text-white shadow-sm">
            <span className="font-medium">
              Faixa etária: {userInfo.faixaEtaria}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center mb-6 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-indigo-900/30 p-4 rounded-xl shadow-lg border border-indigo-500/20">
          <div className="flex items-center text-white font-medium mb-3">
            <Filter
              size={18}
              className="mr-2 text-blue-300 bg-blue-500/20 p-1 rounded-full"
            />
            <span>Filtrar por Sexo</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {sexos.map((sexo) => (
              <button
                key={sexo.id}
                className={`py-2 px-4 rounded-lg transition-all duration-300 shadow-md ${
                  activeSexo === sexo.id
                    ? sexo.id === "Masculino"
                      ? "bg-gradient-to-r from-blue-700 to-blue-600 text-white"
                      : "bg-gradient-to-r from-pink-600 to-pink-500 text-white"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                } ${
                  userInfo.sexo === sexo.id ? "ring-2 ring-blue-300" : ""
                } transform hover:scale-105`}
                onClick={() => setActiveSexo(sexo.id)}
              >
                {sexo.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-indigo-900/30 p-4 rounded-xl shadow-lg border border-indigo-500/20">
          <div className="flex items-center text-white font-medium mb-3">
            <Filter
              size={18}
              className="mr-2 text-blue-300 bg-green-500/20 p-1 rounded-full"
            />
            <span>Filtrar por Idade</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {faixasEtarias.map((faixa) => (
              <button
                key={faixa.id}
                className={`py-2 px-3 rounded-lg transition-all duration-300 shadow-md ${
                  activeFaixaEtaria === faixa.id
                    ? "bg-gradient-to-r from-green-700 to-green-600 text-white"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                } ${
                  userInfo.faixaEtaria === faixa.id
                    ? "ring-2 ring-green-300"
                    : ""
                } transform hover:scale-105`}
                onClick={() => setActiveFaixaEtaria(faixa.id)}
              >
                {faixa.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
