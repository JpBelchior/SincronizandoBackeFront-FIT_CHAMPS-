import React from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { getPositionChangeIcon, formatPositionChange } from "./iconsUtils";

const RankingPositionCard = ({
  category,
  data,
  isActive,
  onClick,
  renderCategoryIcon,
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-slate-800/80 to-indigo-900/30 p-3 rounded-xl shadow-md ${
        isActive
          ? "border border-blue-500/50 shadow-blue-500/20"
          : "border border-slate-700/30"
      } hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 hover:border-blue-400/50`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center mb-2">
        <div className="bg-indigo-900/50 p-2 rounded-lg mr-2">
          {renderCategoryIcon(category)}
        </div>
        <h3 className="text-lg font-semibold text-white">{category}</h3>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-3xl font-bold text-white">{data.posicao}</span>
        <span className="text-blue-200 text-sm ml-1">/{data.total}</span>
      </div>
      <div className="mt-2 flex justify-center">
        <div className="flex items-center bg-slate-800/50 px-3 py-1 rounded-full">
          {getPositionChangeIcon(data.posicao, data.posicaoAnterior)}
          <span
            className={`text-xs ml-1 ${
              data.posicaoAnterior > data.posicao
                ? "text-green-400"
                : data.posicaoAnterior < data.posicao
                ? "text-red-400"
                : "text-gray-400"
            }`}
          >
            {formatPositionChange(data.posicao, data.posicaoAnterior)}
          </span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className="text-sm font-medium bg-indigo-900/50 px-3 py-1 rounded-full text-blue-100 inline-block">
          {data.pontos} pts
        </span>
      </div>
    </div>
  );
};

export default RankingPositionCard;
