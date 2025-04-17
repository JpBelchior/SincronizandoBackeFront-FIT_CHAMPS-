import React from "react";
import { ActivitySquare } from "lucide-react";

const IMCSection = ({ imc }) => {
  // Função para determinar a cor do indicador de IMC
  const getIMCColor = (classification) => {
    switch (classification) {
      case "Abaixo do peso":
        return "text-yellow-500";
      case "Peso normal":
        return "text-green-500";
      case "Sobrepeso":
        return "text-orange-400";
      case "Obesidade grau I":
      case "Obesidade grau II":
      case "Obesidade grau III":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="mt-6 bg-slate-800 p-5 rounded-lg border border-slate-700">
      <div className="flex items-center gap-2 mb-2">
        <ActivitySquare className="text-blue-400" size={20} />
        <h4 className="font-semibold text-white">
          Índice de Massa Corporal (IMC)
        </h4>
      </div>
      <div className="flex flex-wrap gap-6 items-center mt-3">
        <div className="text-center bg-slate-900/80 py-3 px-5 rounded-lg border border-slate-700">
          <div className="text-3xl font-bold text-blue-400">
            {imc.value || "---"}
          </div>
          <div className="text-xs text-slate-400 mt-1">Valor</div>
        </div>
        <div className="bg-slate-900/80 py-3 px-5 rounded-lg border border-slate-700">
          <div
            className={`font-semibold text-xl ${getIMCColor(
              imc.classification
            )}`}
          >
            {imc.classification || "---"}
          </div>
          <div className="text-xs text-slate-400 mt-1">Classificação</div>
        </div>
      </div>
    </div>
  );
};

export default IMCSection;
