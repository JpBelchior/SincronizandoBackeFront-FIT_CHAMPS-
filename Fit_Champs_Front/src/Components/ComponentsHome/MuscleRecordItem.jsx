import React from "react";
import { Award, Target, PartyPopper } from "lucide-react";
import { getGroupIcon } from "./IconUtils";

const MuscleRecordItem = ({
  recorde,
  isHovered,
  isOtherHovered,
  onMouseEnter,
  onMouseLeave,
  openGoalModal,
}) => {
  const metaAlcancada = recorde.recordeVolume >= recorde.metaVolume;

  const cardClasses = `
    bg-slate-900/70 p-5 rounded-xl border border-slate-700
    transition-all duration-300 ease-in-out
    ${isHovered ? "scale-102 shadow-xl z-10 border-blue-500" : ""}
    ${isOtherHovered ? "opacity-70 scale-98" : ""}
    ${metaAlcancada ? "border-green-500/50" : ""}
  `;

  return (
    <div
      className={cardClasses}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center mb-4">
        <div
          className={`p-2 rounded-lg ${
            metaAlcancada ? "bg-green-900/50" : "bg-slate-800"
          }`}
        >
          {getGroupIcon(recorde.grupo)}
        </div>
        <h3 className="text-lg font-semibold ml-3 text-white">
          {recorde.grupo}
        </h3>
        {metaAlcancada && (
          <Award size={18} className="ml-auto text-green-400" />
        )}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <span className="text-slate-400">Volume Atual / Meta:</span>
        <span
          className={`text-2xl font-bold ${
            metaAlcancada ? "text-green-400" : "text-blue-400"
          }`}
        >
          {recorde.recordeVolume}/{recorde.metaVolume}
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
        <div
          className={`h-full rounded-full ${
            metaAlcancada
              ? "bg-gradient-to-r from-green-700 to-green-500"
              : "bg-gradient-to-r from-blue-700 to-blue-500"
          }`}
          style={{
            width: `${Math.min(
              100,
              (recorde.recordeVolume / recorde.metaVolume) * 100
            )}%`,
          }}
        >
          <div className="h-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {Math.min(
                100,
                Math.round((recorde.recordeVolume / recorde.metaVolume) * 100)
              )}
              %
            </span>
          </div>
        </div>
      </div>

      {metaAlcancada && <GoalAchievedMessage />}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-blue-300">Data: {recorde.data}</span>
        <button
          onClick={() => openGoalModal(recorde.grupo)}
          className="text-slate-300 hover:text-blue-400 flex items-center gap-1 bg-slate-800 py-1 px-3 rounded-lg transition-colors hover:bg-slate-700"
        >
          <Target size={14} />
          <span>Alterar Meta</span>
        </button>
      </div>
    </div>
  );
};

const GoalAchievedMessage = () => (
  <div className="flex items-center text-green-400 justify-center p-2 bg-green-900/30 rounded-lg mt-3 border border-green-700/50">
    <PartyPopper className="mr-2" size={18} />
    <span className="font-medium">
      Objetivo Alcançado! Altere sua meta para continuar progredindo.
    </span>
  </div>
);

export default MuscleRecordItem;
