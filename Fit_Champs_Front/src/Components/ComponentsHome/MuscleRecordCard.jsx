import React, { useState } from "react";
import { BarChart2 } from "lucide-react";
import MuscleRecordItem from "./MuscleRecordItem";

const MuscleRecordsCard = ({ recordesMusculares, openGoalModal }) => {
  const [hoveredRecord, setHoveredRecord] = useState(null);

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 border border-slate-700 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-xl">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-4 rounded-lg mb-6 border border-indigo-500/30">
        <div className="flex items-center gap-2">
          <BarChart2 className="text-blue-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Recordes Musculares</h2>
        </div>
        <p className="text-blue-300 mt-1 ml-8">
          Maiores volumes de treino por grupo muscular
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordesMusculares.map((recorde) => (
          <MuscleRecordItem
            key={recorde.grupo}
            recorde={recorde}
            isHovered={hoveredRecord === recorde.grupo}
            isOtherHovered={
              hoveredRecord !== null && hoveredRecord !== recorde.grupo
            }
            onMouseEnter={() => setHoveredRecord(recorde.grupo)}
            onMouseLeave={() => setHoveredRecord(null)}
            openGoalModal={openGoalModal}
          />
        ))}
      </div>
    </div>
  );
};

export default MuscleRecordsCard;
