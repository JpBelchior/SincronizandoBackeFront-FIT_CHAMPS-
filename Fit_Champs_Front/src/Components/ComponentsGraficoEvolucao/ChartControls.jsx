// src/components/GraficosEvolucao/ChartControls.jsx
import React from "react";
import { Filter, BarChart2, Calendar, Target } from "lucide-react";

const ChartControls = ({
  viewMode,
  setViewMode,
  visualizationType,
  setVisualizationType,
  showMetas,
  setShowMetas,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6 w-full md:w-[90%] mx-auto">
      {/* Modos de visualização */}
      <div className="bg-slate-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg flex space-x-2 border border-slate-700">
        <button
          onClick={() => setViewMode("cards")}
          className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
            viewMode === "cards"
              ? "bg-gradient-to-r from-indigo-700 to-blue-800 text-white shadow-md"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
          }`}
        >
          <Filter size={16} className="mr-2" />
          <span>Por Grupo</span>
        </button>
        <button
          onClick={() => setViewMode("comparison")}
          className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
            viewMode === "comparison"
              ? "bg-gradient-to-r from-indigo-700 to-blue-800 text-white shadow-md"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
          }`}
        >
          <BarChart2 size={16} className="mr-2" />
          <span>Comparação</span>
        </button>
        <button
          onClick={() => setViewMode("summary")}
          className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
            viewMode === "summary"
              ? "bg-gradient-to-r from-indigo-700 to-blue-800 text-white shadow-md"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
          }`}
        >
          <Calendar size={16} className="mr-2" />
          <span>Resumo</span>
        </button>
      </div>

      {/* Tipo de gráfico */}
      <div className="bg-slate-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg flex space-x-2 border border-slate-700">
        <button
          onClick={() => setVisualizationType("line")}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            visualizationType === "line"
              ? "bg-gradient-to-r from-indigo-700 to-blue-800 text-white shadow-md"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
          }`}
        >
          Linha
        </button>
        <button
          onClick={() => setVisualizationType("bar")}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            visualizationType === "bar"
              ? "bg-gradient-to-r from-indigo-700 to-blue-800 text-white shadow-md"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
          }`}
        >
          Barras
        </button>
      </div>

      {/* Mostrar/esconder metas */}
      <div className="bg-slate-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-700">
        <button
          onClick={() => setShowMetas(!showMetas)}
          className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
            showMetas
              ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-md"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
          }`}
        >
          <Target size={16} className="mr-2" />
          <span>{showMetas ? "Ocultar Metas" : "Mostrar Metas"}</span>
        </button>
      </div>
    </div>
  );
};

export default ChartControls;
