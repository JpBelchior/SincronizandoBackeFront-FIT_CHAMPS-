import React from "react";
import { Trophy } from "lucide-react";

const RankingTableHeader = ({ activeTab, activeSexo, activeFaixaEtaria }) => {
  return (
    <div className="p-5 bg-gradient-to-r from-slate-800 to-indigo-900/70 border-b border-indigo-500/30 flex items-center justify-between">
      <h2 className="text-xl font-bold flex items-center text-white">
        <div className="bg-indigo-900/50 p-2 rounded-lg mr-3">
          <Trophy size={20} className="text-yellow-500" />
        </div>
        <span className="bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent">
          Ranking {activeTab} - {activeSexo} ({activeFaixaEtaria})
        </span>
      </h2>
      <div className="text-sm bg-indigo-800/50 px-4 py-2 rounded-full text-blue-100 border border-indigo-700/30">
        Top 5 Atletas
      </div>
    </div>
  );
};

export default RankingTableHeader;
