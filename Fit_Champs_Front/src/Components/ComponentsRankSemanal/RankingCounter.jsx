import React from "react";

const RankingCounter = ({ count }) => {
  return (
    <div className="fixed bottom-4 right-4">
      <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-3 rounded-full shadow-xl border border-blue-400/30">
        <span className="px-2 font-bold">{count}</span>
        <span className="text-sm">Rankings</span>
      </div>
    </div>
  );
};

export default RankingCounter;
