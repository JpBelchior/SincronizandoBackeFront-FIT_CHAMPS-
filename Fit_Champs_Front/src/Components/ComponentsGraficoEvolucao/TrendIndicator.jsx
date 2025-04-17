// src/components/GraficosEvolucao/TrendIndicator.jsx
import React from "react";
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from "lucide-react";

const TrendIndicator = ({ trend }) => {
  if (trend.type === "melhora") {
    return (
      <div className="flex items-center bg-green-800/30 p-3 rounded-lg border border-green-600/30">
        <ArrowUpCircle className="mr-2 text-green-500" size={20} />
        <span className="text-green-400 font-medium">
          Melhora de <span className="font-bold">{trend.diff}%</span> em relação
          ao treino anterior, continue assim!
        </span>
      </div>
    );
  } else if (trend.type === "piora") {
    return (
      <div className="flex items-center bg-red-800/30 p-3 rounded-lg border border-red-600/30">
        <ArrowDownCircle className="mr-2 text-red-500" size={20} />
        <span className="text-red-400 font-medium">
          Queda de <span className="font-bold">{trend.diff}%</span> em relação
          ao treino anterior, não deixe a peteca cair!
        </span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
        <MinusCircle className="mr-2 text-slate-400" size={20} />
        <span className="text-slate-300 font-medium">
          Volume mantido em relação ao treino anterior
        </span>
      </div>
    );
  }
};

export default TrendIndicator;
