// src/components/GraficosEvolucao/SummaryChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";
import { Calendar } from "lucide-react";
import { prepareSummaryData } from "./Utils";

const SummaryChart = ({ trainingData, trainingTypes, visualizationType }) => {
  const data = prepareSummaryData(trainingData, trainingTypes);
  const colors = {
    Peito: "#3B82F6",
    Costas: "#10B981",
    Braço: "#F59E0B",
    Perna: "#8B5CF6",
    Ombro: "#EC4899",
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg w-full border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-slate-100 flex items-center">
        <Calendar className="mr-2 text-blue-400" size={20} />
        Evolução Total do Treino
      </h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {visualizationType === "line" ? (
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis dataKey="data" tick={{ fill: "#94a3b8" }} />
              <YAxis
                label={{
                  value: "Volume (kg)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#94a3b8",
                }}
                tick={{ fill: "#94a3b8" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  borderRadius: "8px",
                  borderColor: "#1e293b",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
                  color: "#e2e8f0",
                }}
              />
              <Legend />
              {trainingTypes.map((type) => (
                <Line
                  key={type}
                  type="monotone"
                  dataKey={type}
                  stroke={colors[type]}
                  strokeWidth={2}
                  name={type}
                />
              ))}
            </ComposedChart>
          ) : (
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis dataKey="data" tick={{ fill: "#94a3b8" }} />
              <YAxis
                label={{
                  value: "Volume (kg)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#94a3b8",
                }}
                tick={{ fill: "#94a3b8" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  borderRadius: "8px",
                  borderColor: "#1e293b",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
                  color: "#e2e8f0",
                }}
              />
              <Legend />
              {trainingTypes.map((type) => (
                <Bar
                  key={type}
                  dataKey={type}
                  fill={colors[type]}
                  stackId="a"
                  name={type}
                />
              ))}
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SummaryChart;
