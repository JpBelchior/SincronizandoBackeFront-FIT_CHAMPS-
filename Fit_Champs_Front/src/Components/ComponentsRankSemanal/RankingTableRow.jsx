import React from "react";
import { User, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Medal } from "lucide-react";
import { getPositionChangeIcon, formatPositionChange } from "./iconsUtils";

const RankingTableRow = ({ user, index, isCurrentUser }) => {
  // Função para renderizar medalha baseada na posição
  const renderMedal = (position) => {
    if (position === 1) {
      return (
        <div className="bg-yellow-400/20 p-2 rounded-full">
          <Medal size={24} className="text-yellow-500" />
        </div>
      );
    } else if (position === 2) {
      return (
        <div className="bg-gray-400/20 p-2 rounded-full">
          <Medal size={24} className="text-gray-400" />
        </div>
      );
    } else if (position === 3) {
      return (
        <div className="bg-amber-700/20 p-2 rounded-full">
          <Medal size={24} className="text-amber-700" />
        </div>
      );
    }
    return (
      <div className="bg-slate-700/30 p-2 rounded-full flex items-center justify-center w-10 h-10">
        <span className="text-lg font-bold text-slate-300">{position}</span>
      </div>
    );
  };

  return (
    <tr
      className={`transition-colors ${
        isCurrentUser
          ? "bg-blue-900/20 hover:bg-blue-900/30"
          : index % 2 === 0
          ? "bg-slate-800/20 hover:bg-slate-800/40"
          : "bg-slate-900/20 hover:bg-slate-800/40"
      }`}
    >
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex items-center">{renderMedal(index + 1)}</div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            {user.foto ? (
              <img
                className="h-12 w-12 rounded-full object-cover border-2 border-slate-700/50"
                src={user.foto}
                alt={user.nome}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-700 to-blue-600 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-100" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-base font-medium text-white flex items-center">
              {user.nome}
              {isCurrentUser && (
                <span className="ml-2 inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs px-3 py-1 rounded-full">
                  Você
                </span>
              )}
            </div>
            <div className="text-xs text-blue-300">{user.idade} anos</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="text-sm text-white bg-gradient-to-r from-indigo-900/70 to-slate-800/70 rounded-full px-4 py-2 inline-block text-center font-medium border border-indigo-700/30">
          {user.pontos} pts
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex items-center bg-slate-800/50 px-3 py-1 rounded-lg inline-flex">
          {getPositionChangeIcon(index + 1, user.posicaoAnterior)}
          <span
            className={`ml-1 font-medium ${
              user.posicaoAnterior > index + 1
                ? "text-green-400"
                : user.posicaoAnterior < index + 1
                ? "text-red-400"
                : "text-gray-400"
            }`}
          >
            {formatPositionChange(index + 1, user.posicaoAnterior)}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default RankingTableRow;
