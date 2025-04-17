import React, { useMemo, useState } from "react";
import {
  Activity,
  TrendingUp,
  ClipboardList,
  BicepsFlexedIcon,
  Target,
  Trophy,
  Zap,
  ChevronDown,
  ChevronUp,
  Check,
  BarChart2,
} from "lucide-react";
import exerciciosPorTipo from "../../Classes/exercicio";

const TreinoTipoSumario = ({ exerciciosPorTreino, treinos }) => {
  const [expandedType, setExpandedType] = useState(null);

  // Função para obter todos os subgrupos possíveis para um tipo de treino
  const getTodosSubgruposPorTipo = (tipoTreino) => {
    const exercicios = exerciciosPorTipo[tipoTreino] || [];
    // Criar um Set para evitar duplicatas
    const subgruposSet = new Set();

    exercicios.forEach((ex) => {
      if (ex.subgrupo) {
        subgruposSet.add(ex.subgrupo);
      }
    });

    return Array.from(subgruposSet);
  };

  const treinoTipoSummary = useMemo(() => {
    const summary = {};

    treinos.forEach((treino) => {
      if (treino.descripition === "Day Off") return;

      const exercises = exerciciosPorTreino[treino.id] || [];

      if (!summary[treino.descripition]) {
        summary[treino.descripition] = {
          total: 0,
          exercicios: [],
          volumePorDia: {},
          sessionCount: 0,
          muscleGroups: {}, // Todos os subgrupos possíveis
          selectedMuscleGroups: {}, // Subgrupos que foram selecionados
        };

        // Inicializar todos os subgrupos possíveis para este tipo de treino
        const todosSubgrupos = getTodosSubgruposPorTipo(treino.descripition);
        todosSubgrupos.forEach((subgrupo) => {
          summary[treino.descripition].muscleGroups[subgrupo] = 0;
        });
      }

      summary[treino.descripition].sessionCount += 1;

      const dailyVolume = exercises.reduce(
        (total, ex) => total + (ex.volume || 0),
        0
      );
      summary[treino.descripition].total += dailyVolume;
      summary[treino.descripition].volumePorDia[treino.data] = dailyVolume;
      summary[treino.descripition].exercicios.push(...exercises);

      // Contar exercícios por subgrupo muscular
      exercises.forEach((ex) => {
        if (ex.subgrupo) {
          // Incrementar contagem no subgrupo
          summary[treino.descripition].muscleGroups[ex.subgrupo] =
            (summary[treino.descripition].muscleGroups[ex.subgrupo] || 0) + 1;

          // Se o exercício tem nome (foi selecionado), marcá-lo como selecionado
          if (ex.nome) {
            summary[treino.descripition].selectedMuscleGroups[ex.subgrupo] =
              (summary[treino.descripition].selectedMuscleGroups[ex.subgrupo] ||
                0) + 1;
          }
        }
      });
    });

    return summary;
  }, [exerciciosPorTreino, treinos]);

  const detalhamentoTipos = Object.entries(treinoTipoSummary)
    .map(([tipo, dados]) => ({
      tipo,
      totalVolume: Math.round(dados.total),
      sessionCount: dados.sessionCount,
      exerciseCount: dados.exercicios.length,
      muscleGroups: dados.muscleGroups,
      selectedMuscleGroups: dados.selectedMuscleGroups,
      averageVolume:
        dados.sessionCount > 0
          ? (dados.total / dados.sessionCount).toFixed(2)
          : 0,
      volumePorDia: Object.entries(dados.volumePorDia).map(
        ([data, volume]) => ({
          data,
          volume: Math.round(volume),
        })
      ),
    }))
    .filter((item) => item.sessionCount > 0 && item.exerciseCount > 0);

  const getIntensityLevel = (averageVolume) => {
    if (averageVolume < 5000) return { label: "Leve", color: "text-green-400" };
    if (averageVolume < 9000)
      return { label: "Moderado", color: "text-yellow-400" };
    return { label: "Intenso", color: "text-red-400" };
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-2xl p-8 mt-6 shadow-2xl hover:shadow-3xl transition-all duration-300 w-full border border-indigo-500/30 backdrop-blur-sm">
      <div className="flex items-center justify-center mb-6">
        <BarChart2 className="text-blue-400 mr-3" size={32} />
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text text-transparent">
          Resumo dos Meus Treinos
        </h1>
      </div>

      {Object.keys(treinoTipoSummary).length > 0 ? (
        <div className="mt-6 space-y-8 max-w-1xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {detalhamentoTipos.map((item) => {
              const intensityLevel = getIntensityLevel(item.averageVolume);

              return (
                <div
                  key={item.tipo}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 group border border-indigo-500/20 hover:border-indigo-500/40 
                 "
                >
                  <div className="flex justify-between items-center mb-4 ">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
                      {item.tipo}
                    </h3>
                    <button
                      onClick={() =>
                        setExpandedType(
                          expandedType === item.tipo ? null : item.tipo
                        )
                      }
                      className="text-blue-300 hover:text-blue-100 bg-slate-700/50 p-2 rounded-full transition-colors"
                    >
                      {expandedType === item.tipo ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                      <ClipboardList
                        className="text-green-400 mr-3"
                        size={20}
                      />
                      <span className="text-white">
                        Sessões: <strong>{item.sessionCount}</strong>
                      </span>
                    </div>
                    <div className="flex items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                      <ClipboardList
                        className="text-green-400 mr-3"
                        size={20}
                      />
                      <span className="text-white">
                        Exercícios: <strong>{item.exerciseCount}</strong>
                      </span>
                    </div>
                    <div className="flex items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                      <TrendingUp className="text-green-400 mr-3" size={20} />
                      <span className="text-white">
                        Volume Total: <strong>{item.totalVolume}</strong>
                      </span>
                    </div>
                    <div className="flex items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                      <Zap
                        className={`mr-3 ${intensityLevel.color}`}
                        size={20}
                      />
                      <span className="text-white">
                        Intensidade: <strong>{intensityLevel.label}</strong>
                      </span>
                    </div>

                    {expandedType === item.tipo && (
                      <div className="mt-4 bg-indigo-900/20 p-4 rounded-xl border border-indigo-800/30">
                        <h4 className="text-blue-200 mb-4 font-semibold flex items-center">
                          <Target className="mr-2 text-blue-300" size={18} />
                          Subgrupos Musculares Fadigados :
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          {Object.entries(item.muscleGroups).map(
                            ([muscle, count]) => {
                              const isSelected =
                                !!item.selectedMuscleGroups[muscle];
                              return (
                                <div
                                  key={muscle}
                                  className={`px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                                    isSelected
                                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                                      : "bg-gradient-to-r from-slate-700 to-indigo-900/50 text-blue-200"
                                  } flex items-center justify-between min-w-[180px] w-full`}
                                >
                                  <div className="flex items-center flex-grow mr-3">
                                    <span className="truncate">{muscle}</span>
                                  </div>
                                  <span className="font-medium bg-slate-800/50 px-2 py-1 rounded-lg">
                                    {isSelected
                                      ? `${item.selectedMuscleGroups[muscle]}/${count}`
                                      : "0"}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Volume Total por Tipo de Treino */}
          <div className="bg-gradient-to-br from-slate-800 to-indigo-900/30 rounded-xl p-6 shadow-lg border border-indigo-500/20">
            <div className="flex items-center mb-5">
              <BicepsFlexedIcon className="text-blue-400 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-white">
                Volume Total por Tipo de Treino
              </h2>
            </div>
            <div className="space-y-4">
              {Object.entries(treinoTipoSummary)
                .filter(([_, dados]) => dados.total > 0)
                .sort((a, b) => b[1].total - a[1].total)
                .map(([tipo, dados], index) => (
                  <div
                    key={tipo}
                    className="flex justify-between items-center text-white bg-slate-800/70 p-4 rounded-xl hover:bg-slate-700/70 transition-colors border border-slate-700/30 transform hover:scale-[1.01] transition-transform"
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          index === 0
                            ? "bg-yellow-500/20"
                            : index === 1
                            ? "bg-slate-400/20"
                            : index === 2
                            ? "bg-amber-700/20"
                            : "bg-slate-600/20"
                        } mr-3`}
                      >
                        {index < 3 ? (
                          <Trophy
                            className={`${
                              index === 0
                                ? "text-yellow-400"
                                : index === 1
                                ? "text-slate-300"
                                : "text-amber-600"
                            }`}
                            size={20}
                          />
                        ) : (
                          <span className="text-sm font-bold text-slate-400">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <span className="font-medium">{tipo}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-indigo-800/50 px-4 py-2 rounded-lg font-bold">
                        {Math.round(dados.total)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/80 p-8 rounded-xl border border-slate-700/50 text-center">
          <p className="text-blue-200 text-lg">
            Nenhum dado de treino disponível ainda. Adicione exercícios aos seus
            treinos para visualizar o resumo.
          </p>
        </div>
      )}
    </div>
  );
};

export default TreinoTipoSumario;
