import React from "react";
import RankingTableHeader from "./RankingTableHeader";
import RankingTableRow from "./RankingTableRow";
import LoadingIndicator from "./LoadingIndicator";

const RankingTable = ({
  activeTab,
  activeSexo,
  activeFaixaEtaria,
  rankingData,
  isLoading,
  currentUserId,
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-indigo-900/20 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden w-full md:w-[90%] lg:w-[80%] mx-auto border border-indigo-500/20">
      <RankingTableHeader
        activeTab={activeTab}
        activeSexo={activeSexo}
        activeFaixaEtaria={activeFaixaEtaria}
      />

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/70">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider border-b border-slate-700/30">
                  Posição
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider border-b border-slate-700/30">
                  Atleta
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider border-b border-slate-700/30">
                  Pontos
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider border-b border-slate-700/30">
                  Variação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {rankingData[activeTab] &&
                rankingData[activeTab].map((user, index) => (
                  <RankingTableRow
                    key={user.id}
                    user={user}
                    index={index}
                    isCurrentUser={user.id === currentUserId}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
        <p className="text-sm text-blue-200 text-center">
          A pontuação é calculada com base no volume de treino, intensidade e
          frequência semanal.
        </p>
      </div>
    </div>
  );
};

export default RankingTable;
