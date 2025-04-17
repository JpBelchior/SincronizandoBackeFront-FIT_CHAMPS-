import React from "react";
import { Crown } from "lucide-react";

const RankingHeader = () => {
  return (
    <div className="text-center bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-6 rounded-2xl w-full md:w-[90%] lg:w-[80%] mx-auto mb-6 shadow-xl border border-indigo-500/30 backdrop-blur-sm">
      <div className="flex justify-center items-center gap-3 mb-2">
        <Crown className="text-yellow-400" size={28} />
        <h1 className="text-3xl font-bold text-white">Ranking Semanal</h1>
      </div>
      <p className="text-blue-200 mt-2">
        Veja como você se compara com outros atletas esta semana!
      </p>
    </div>
  );
};

export default RankingHeader;
