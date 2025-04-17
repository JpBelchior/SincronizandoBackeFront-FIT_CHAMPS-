// src/components/GraficosEvolucao/ProgressIndicator.jsx
import React from "react";
import { Award } from "lucide-react";
import { calculateProgress } from "./utils";

const ProgressIndicator = ({ type, data, meta }) => {
  const progress = calculateProgress(data, meta);
  const lastVolume = data.length > 0 ? data[data.length - 1].volume : 0;

  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-gray-300 mb-1">
        <span>Progresso para meta: {progress}%</span>
        <span>
          {lastVolume} / {meta} kg
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${
            progress >= 100 ? "bg-green-500" : "bg-blue-600"
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      {progress >= 100 && (
        <div className="flex items-center justify-center mt-1 text-green-500">
          <Award size={14} className="mr-1" />
          <span className="text-xs">Meta alcançada!</span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;
