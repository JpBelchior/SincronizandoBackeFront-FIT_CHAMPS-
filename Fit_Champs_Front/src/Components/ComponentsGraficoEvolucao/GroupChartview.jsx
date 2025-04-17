// src/components/GraficosEvolucao/GroupChartView.jsx
import React from "react";
import TrainingCard from "./TrainingCard";

const GroupChartView = ({
  trainingData,
  trainingTypes,
  hoveredChart,
  setHoveredChart,
  visualizationType,
  showMetas,
  metas,
  icons,
}) => {
  const isOdd = trainingTypes.length % 2 !== 0;
  const lastItemIndex = trainingTypes.length - 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[95%] md:w-[90%] mx-auto pb-8">
      {trainingTypes.map((type, index) => {
        const isLastItemOdd = isOdd && index === lastItemIndex;

        return (
          <TrainingCard
            key={type}
            type={type}
            data={trainingData[type]}
            icons={icons}
            isLastItemOdd={isLastItemOdd}
            hoveredChart={hoveredChart}
            setHoveredChart={setHoveredChart}
            visualizationType={visualizationType}
            showMetas={showMetas}
            metas={metas}
          />
        );
      })}
    </div>
  );
};

export default GroupChartView;
