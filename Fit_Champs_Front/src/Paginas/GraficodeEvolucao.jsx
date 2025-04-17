// src/components/GraficosEvolucao/index.jsx
import React, { useState } from "react";
import { useGlobalContext } from "../Context/ContextoGlobal";

// Componentes
import Header from "../Components/ComponentsGraficoEvolucao/Header";
import ChartControls from "../Components/ComponentsGraficoEvolucao/ChartControls";
import GroupChartView from "../Components/ComponentsGraficoEvolucao/GroupChartView";
import ComparisonChart from "../Components/ComponentsGraficoEvolucao/ComparisonChart";
import SummaryChart from "../Components/ComponentsGraficoEvolucao/SummaryChart";

// Imagens
import peito from "../images/peito.png";
import perna from "../images/perna.png";
import ombro from "../images/ombro.png";
import costas from "../images/costas.png";
import braco from "../images/musculo.png";

const GraficosEvolucao = () => {
  const { isMenuOpen } = useGlobalContext();
  const [hoveredChart, setHoveredChart] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // cards, comparison, summary
  const [visualizationType, setVisualizationType] = useState("line"); // line, bar
  const [showMetas, setShowMetas] = useState(false);

  // Dados de metas
  const metas = {
    Peito: 3500,
    Costas: 3400,
    Braço: 2100,
    Perna: 4500,
    Ombro: 2300,
  };

  // Ícones para os grupos musculares
  const icons = {
    peito,
    perna,
    ombro,
    costas,
    braco,
  };

  // Dados de exemplo para diferentes tipos de treino
  const [trainingData] = useState({
    Peito: [
      { data: "10/01/2025", volume: 2400 },
      { data: "17/01/2025", volume: 2600 },
      { data: "24/01/2025", volume: 2550 },
      { data: "31/01/2025", volume: 2800 },
      { data: "07/02/2025", volume: 3000 },
      { data: "14/02/2025", volume: 3200 },
    ],
    Costas: [
      { data: "11/01/2025", volume: 2200 },
      { data: "18/01/2025", volume: 2500 },
      { data: "25/01/2025", volume: 2700 },
      { data: "01/02/2025", volume: 2650 },
      { data: "08/02/2025", volume: 2900 },
      { data: "15/02/2025", volume: 3100 },
    ],
    Braço: [
      { data: "12/01/2025", volume: 1400 },
      { data: "19/01/2025", volume: 1500 },
      { data: "26/01/2025", volume: 1700 },
      { data: "02/02/2025", volume: 1650 },
      { data: "09/02/2025", volume: 1800 },
      { data: "16/02/2025", volume: 1900 },
    ],
    Perna: [
      { data: "13/01/2025", volume: 3200 },
      { data: "20/01/2025", volume: 3400 },
      { data: "27/01/2025", volume: 3600 },
      { data: "10/02/2025", volume: 3750 },
      { data: "17/02/2025", volume: 4000 },
      { data: "24/02/2025", volume: 3900 },
    ],
    Ombro: [
      { data: "14/01/2025", volume: 1800 },
      { data: "21/01/2025", volume: 1850 },
      { data: "28/01/2025", volume: 1900 },
      { data: "04/02/2025", volume: 2000 },
      { data: "11/02/2025", volume: 1950 },
      { data: "18/02/2025", volume: 2400 },
    ],
  });

  // Lista dos tipos de treino
  const trainingTypes = Object.keys(trainingData);

  return (
    <div className="w-screen h-full flex justify-center bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 p-6">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {/* Cabeçalho */}
        <Header />

        {/* Controles */}
        <ChartControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          visualizationType={visualizationType}
          setVisualizationType={setVisualizationType}
          showMetas={showMetas}
          setShowMetas={setShowMetas}
        />

        {/* Visualizações */}
        {viewMode === "cards" && (
          <GroupChartView
            trainingData={trainingData}
            trainingTypes={trainingTypes}
            hoveredChart={hoveredChart}
            setHoveredChart={setHoveredChart}
            visualizationType={visualizationType}
            showMetas={showMetas}
            metas={metas}
            icons={icons}
          />
        )}

        {viewMode === "comparison" && (
          <div className="w-[95%] md:w-[90%] mx-auto pb-8">
            <ComparisonChart
              trainingData={trainingData}
              visualizationType={visualizationType}
              showMetas={showMetas}
              metas={metas}
            />
          </div>
        )}

        {viewMode === "summary" && (
          <div className="w-[95%] md:w-[90%] mx-auto pb-8">
            <SummaryChart
              trainingData={trainingData}
              trainingTypes={trainingTypes}
              visualizationType={visualizationType}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GraficosEvolucao;
