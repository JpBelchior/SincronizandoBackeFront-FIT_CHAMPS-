// src/components/GraficosEvolucao/TrainingChart.jsx
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

const TrainingChart = ({
  type,
  data,
  showMetas,
  metas,
  visualizationType,
  hoveredChart,
  isLastItemOdd = false,
}) => {
  const chartProps = {
    data: data,
    margin: { top: 5, right: 20, left: 20, bottom: 5 },
  };

  // Dados com meta para os gráficos
  const updatedData = data.map((item) => ({
    ...item,
    meta: showMetas ? metas[type] || 0 : 0,
  }));

  // Linha da meta para gráfico de linha
  const metaData = showMetas
    ? data.map((item) => ({
        data: item.data,
        volume: metas[type],
      }))
    : [];

  return (
    <div className={`h-64 ${isLastItemOdd ? "md:w-1/2 md:mx-auto" : ""}`}>
      <ResponsiveContainer width="100%" height="100%">
        {visualizationType === "line" ? (
          <LineChart {...chartProps}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.3}
            />
            <XAxis
              dataKey="data"
              tick={{ fill: "#94a3b8" }}
              axisLine={{ stroke: "#334155" }}
            />
            <YAxis
              label={{
                value: "Volume (kg)",
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
              }}
              tick={{ fill: "#94a3b8" }}
              axisLine={{ stroke: "#334155" }}
            />
            <Tooltip
              formatter={(value) => [`${value} kg`, "Volume"]}
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                borderRadius: "8px",
                borderColor: "#1e293b",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
                color: "#e2e8f0",
              }}
              labelStyle={{ color: "#e2e8f0" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="volume"
              stroke={hoveredChart === type ? "#1E40AF" : "#3B82F6"}
              strokeWidth={hoveredChart === type ? 3 : 2}
              activeDot={{ r: 8 }}
              name={`Volume ${type}`}
              fillOpacity={1}
              fill="url(#colorVolume)"
            />
            {showMetas && (
              <Line
                type="monotone"
                data={metaData}
                dataKey="volume"
                stroke="#10B981"
                strokeDasharray="5 5"
                strokeWidth={2}
                name="Meta"
                dot={false}
                fillOpacity={1}
                fill="url(#colorMeta)"
              />
            )}
          </LineChart>
        ) : (
          <ComposedChart data={updatedData}>
            <defs>
              <linearGradient
                id={`barGradient-${type}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={hoveredChart === type ? "#1E40AF" : "#3B82F6"}
                />
                <stop
                  offset="100%"
                  stopColor={hoveredChart === type ? "#2563EB" : "#60A5FA"}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.3}
            />
            <XAxis
              dataKey="data"
              tick={{ fill: "#94a3b8" }}
              axisLine={{ stroke: "#334155" }}
            />
            <YAxis
              label={{
                value: "Volume (kg)",
                angle: -90,
                position: "insideLeft",
                fill: "#94a3b8",
              }}
              tick={{ fill: "#94a3b8" }}
              axisLine={{ stroke: "#334155" }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const treino = payload.find(
                    (entry) => entry.dataKey === "volume"
                  );
                  const meta = payload.find(
                    (entry) => entry.dataKey === "meta"
                  );

                  return (
                    <div className="custom-tooltip bg-slate-800 p-3 border border-slate-700 rounded-lg shadow-lg">
                      <p className="font-medium text-slate-200 border-b border-slate-700 pb-1 mb-2">
                        {label}
                      </p>
                      {treino && (
                        <p className="text-blue-400 flex items-center">
                          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                          Treino:{" "}
                          <span className="font-bold ml-1">
                            {treino.value} kg
                          </span>
                        </p>
                      )}
                      {meta && meta.value > 0 && (
                        <p className="text-emerald-400 flex items-center mt-1">
                          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                          Meta:{" "}
                          <span className="font-bold ml-1">
                            {meta.value} kg
                          </span>
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              formatter={(value, entry) => {
                const color = value.includes("Meta") ? "#10B981" : "#3B82F6";
                return <span style={{ color: color }}>{value}</span>;
              }}
            />

            {showMetas && (
              <Line
                type="monotone"
                dataKey="meta"
                stroke="#10B981"
                strokeDasharray="5 5"
                strokeWidth={2}
                name="Meta"
                dot={false}
              />
            )}

            <Bar
              dataKey="volume"
              fill={`url(#barGradient-${type})`}
              name={`Volume ${type}`}
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TrainingChart;
