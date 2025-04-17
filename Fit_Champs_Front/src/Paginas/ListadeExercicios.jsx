import React, { useState, useEffect } from "react";
import { useExercicios } from "../Context/ExerciciosContext";
import { useGlobalContext } from "../Context/ContextoGlobal";
import {
  Save,
  PlusCircle,
  Trash,
  Activity,
  Check,
  Info,
  ArrowLeft,
  BarChart2,
  Dumbbell,
  Calendar,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TreinoTipoSumario from "../Components/ComponentsListaExercicios/resumoSemanal";
import exerciciosPorTipo, { encontrarExercicio } from "../Classes/exercicio";
import CustomDropdown from "../Components/ComponentsListaExercicios/selectmo";

function ListadeExercicios() {
  const { isMenuOpen } = useGlobalContext();
  const { treinos } = useExercicios();
  const [exerciciosPorTreino, setExerciciosPorTreino] = useState({});
  const [expandedTreino, setExpandedTreino] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();
  const [trainingDateAndVolume, setTrainingDateAndVolume] = useState({});
  const [activeView, setActiveView] = useState("list"); // 'list' or 'summary'

  // Inicializar exercícios para todos os treinos ao carregar
  useEffect(() => {
    treinos.forEach((treino) => {
      if (
        treino.descripition !== "Day Off" &&
        !exerciciosPorTreino[treino.id]
      ) {
        inicializarExercicios(treino.id);
      }
    });
  }, [treinos]);

  const inicializarExercicios = (treinoId) => {
    const treino = treinos.find((t) => t.id === treinoId);
    if (!treino || exerciciosPorTreino[treinoId]) return;

    const novoExercicios = [];
    for (let i = 0; i < treino.Nexercicio; i++) {
      novoExercicios.push({
        id: Math.random().toString(36).substr(2, 9),
        nome: "",
        repeticoes: "3 x 12",
        peso: 0,
        volume: 0,
        subgrupo: "", // Adicionando propriedade subgrupo para cada exercício
      });
    }

    setExerciciosPorTreino((prev) => ({
      ...prev,
      [treinoId]: novoExercicios,
    }));
  };

  const adicionarExercicio = (treinoId) => {
    const novoExercicio = {
      id: Math.random().toString(36).substr(2, 9),
      nome: "",
      repeticoes: "3 x 12",
      peso: 0,
      volume: 0,
      subgrupo: "", // Adicionando propriedade subgrupo ao novo exercício
    };

    setExerciciosPorTreino((prev) => ({
      ...prev,
      [treinoId]: [...(prev[treinoId] || []), novoExercicio],
    }));
  };

  const removerExercicio = (treinoId, exercicioId) => {
    setExerciciosPorTreino((prev) => ({
      ...prev,
      [treinoId]: prev[treinoId].filter((ex) => ex.id !== exercicioId),
    }));
  };

  const atualizarExercicio = (treinoId, exercicioId, campo, valor) => {
    setExerciciosPorTreino((prev) => {
      const novoExerciciosPorTreino = { ...prev };

      // Se estamos atualizando o nome do exercício, também precisamos atualizar o subgrupo
      if (campo === "nome" && valor) {
        // Encontrar o exercício selecionado na lista de exercícios por tipo
        const treinoAtual = treinos.find((t) => t.id === treinoId);
        if (treinoAtual) {
          const tipoTreino = treinoAtual.descripition;
          const exercicioSelecionado = encontrarExercicio(tipoTreino, valor);

          if (exercicioSelecionado) {
            // Atualize tanto o nome quanto o subgrupo
            novoExerciciosPorTreino[treinoId] = novoExerciciosPorTreino[
              treinoId
            ].map((ex) =>
              ex.id === exercicioId
                ? {
                    ...ex,
                    [campo]: valor,
                    subgrupo: exercicioSelecionado.subgrupo,
                  }
                : ex
            );
            return novoExerciciosPorTreino;
          }
        }
      }

      // Caso contrário, apenas atualize o campo solicitado
      novoExerciciosPorTreino[treinoId] = novoExerciciosPorTreino[treinoId].map(
        (ex) => (ex.id === exercicioId ? { ...ex, [campo]: valor } : ex)
      );

      return novoExerciciosPorTreino;
    });

    // Se atualizarmos peso ou repetições, calcular volume
    if (campo === "peso" || campo === "repeticoes") {
      setTimeout(() => {
        // Buscar o exercício atualizado
        const exercicio = exerciciosPorTreino[treinoId]?.find(
          (ex) => ex.id === exercicioId
        );

        if (exercicio) {
          const repeticoesMatch =
            exercicio.repeticoes.match(/(\d+)\s*x\s*(\d+)/);

          if (repeticoesMatch) {
            const series = parseInt(repeticoesMatch[1]);
            const reps = parseInt(repeticoesMatch[2]);
            const peso =
              campo === "peso" ? parseFloat(valor) : parseFloat(exercicio.peso);

            // Calcular volume (séries x repetições x peso)
            const volume = series * reps * peso;

            // Atualizar volume
            setExerciciosPorTreino((prev) => ({
              ...prev,
              [treinoId]: prev[treinoId].map((ex) =>
                ex.id === exercicioId ? { ...ex, volume } : ex
              ),
            }));
          }
        }
      }, 0);
    }
  };

  const toggleExpandTreino = (treinoId) => {
    setExpandedTreino(expandedTreino === treinoId ? null : treinoId);
  };

  const salvarTreino = () => {
    setIsSaving(true);

    // Simular tempo de salvamento
    setTimeout(() => {
      console.log("Treinos salvos:", {
        treinos,
        exerciciosPorTreino,
      });

      // Capture the current date and volumes when saving
      const currentDate = new Date();
      const volumeSummary = {};

      treinos.forEach((treino) => {
        if (treino.descripition !== "Day Off") {
          const stats = calcularTotalPorTreino(treino.id);
          volumeSummary[treino.id] = {
            text: treino.text,
            descripition: treino.descripition,
            volume: stats.volume,
            data: treino.data,
            date: currentDate.toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            }),
          };
        }
      });

      setTrainingDateAndVolume(volumeSummary);

      setIsSaving(false);
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    }, 1000);
  };

  const calcularTotalPorTreino = (treinoId) => {
    if (!exerciciosPorTreino[treinoId]) return { exercicios: 0, volume: 0 };

    const treino = exerciciosPorTreino[treinoId];
    const exerciciosCompletos = treino.filter((ex) => ex.nome !== "").length;
    const volumeTotal = treino.reduce(
      (total, ex) => total + (ex.volume || 0),
      0
    );

    return {
      exercicios: exerciciosCompletos,
      exerciciosTotal: treino.length,
      volume: volumeTotal,
    };
  };

  const voltarParaTreinosSemanais = () => {
    navigate("/TreinosSemanais");
  };

  const hasExercicios = treinos.some(
    (treino) =>
      treino.descripition !== "Day Off" &&
      exerciciosPorTreino[treino.id] &&
      exerciciosPorTreino[treino.id].length > 0
  );

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 flex justify-center p-6 overflow-y-auto">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {/* Cabeçalho moderno */}
        <div className="text-center bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-6 rounded-2xl mt-2 w-full md:w-[80%] mx-auto mb-6 shadow-xl border border-indigo-500/30 backdrop-blur-sm">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Dumbbell className="text-blue-400" size={32} />
            <h1 className="text-3xl font-bold text-white">
              Lista de Exercícios
            </h1>
          </div>
          <p className="text-blue-200 mt-2 text-lg">
            Selecione os exercícios para cada dia de treino
          </p>

          <div className="flex justify-center mt-4">
            <button
              onClick={voltarParaTreinosSemanais}
              className="flex items-center gap-2 text-blue-300 hover:text-blue-100 bg-slate-800 py-2 px-4 rounded-lg transition-colors hover:bg-slate-700"
            >
              <ArrowLeft size={16} />
              <span>Voltar para Treinos Semanais</span>
            </button>
          </div>
        </div>

        {/* Controles de visualização */}
        {hasExercicios && (
          <div className="flex flex-wrap justify-center gap-4 mb-6 w-full md:w-[90%] mx-auto">
            <div className="bg-slate-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg flex space-x-2 border border-slate-700">
              <button
                onClick={() => setActiveView("list")}
                className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
                  activeView === "list"
                    ? "bg-gradient-to-r from-indigo-700 to-blue-800 text-white shadow-md"
                    : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                }`}
              >
                <Filter size={16} className="mr-2" />
                <span>Lista de Exercícios</span>
              </button>
              <button
                onClick={() => setActiveView("summary")}
                className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
                  activeView === "summary"
                    ? "bg-gradient-to-r from-indigo-700 to-blue-800 text-white shadow-md"
                    : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                }`}
              >
                <BarChart2 size={16} className="mr-2" />
                <span>Resumo Semanal</span>
              </button>
            </div>
          </div>
        )}

        {hasExercicios ? (
          <div className="space-y-6 w-full md:w-[90%] mx-auto">
            {activeView === "list" && (
              <>
                {treinos.map((treino) => {
                  if (treino.descripition === "Day Off") return null;

                  // Only render the training day if it has exercises
                  if (
                    !exerciciosPorTreino[treino.id] ||
                    exerciciosPorTreino[treino.id].length === 0
                  ) {
                    return null;
                  }

                  const stats = calcularTotalPorTreino(treino.id);
                  const isExpanded = expandedTreino === treino.id;

                  return (
                    <div
                      key={treino.id}
                      className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-slate-700 transition-all duration-300 hover:shadow-2xl"
                    >
                      <div
                        className="p-5 bg-gradient-to-r from-slate-800 to-indigo-900/70 flex justify-between items-center cursor-pointer hover:from-slate-700 hover:to-indigo-800/70 transition-colors"
                        onClick={() => toggleExpandTreino(treino.id)}
                      >
                        <div>
                          <h2 className="text-xl font-bold text-white flex items-center">
                            <Calendar
                              className="mr-2 text-blue-300"
                              size={20}
                            />
                            {treino.text} ({treino.data}) -{" "}
                            {treino.descripition}
                          </h2>
                          <div className="flex gap-4 mt-2">
                            <span className="text-blue-200 bg-slate-700/70 px-3 py-1 rounded-lg text-sm">
                              {stats.exercicios}/{stats.exerciciosTotal}{" "}
                              exercícios
                            </span>
                            <span className="text-blue-200 bg-slate-700/70 px-3 py-1 rounded-lg text-sm">
                              Volume total: {stats.volume}
                            </span>
                          </div>
                        </div>
                        <div className="text-white bg-slate-700/50 p-2 rounded-full">
                          {isExpanded ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 15l-6-6-6 6" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="bg-slate-900/90 p-5">
                          <div className="space-y-4">
                            <div className="grid grid-cols-12 gap-3 text-blue-200 font-medium bg-indigo-900/50 p-3 rounded-lg text-sm border border-indigo-800/50">
                              <div className="col-span-3">
                                Nome do Exercício
                              </div>
                              <div className="col-span-2">
                                Subgrupo Muscular
                              </div>
                              <div className="col-span-2">Repetições</div>
                              <div className="col-span-2">Peso (kg)</div>
                              <div className="col-span-2">Volume</div>
                              <div className="col-span-1">Apagar Exercicio</div>
                            </div>

                            {exerciciosPorTreino[treino.id].map(
                              (exercicio, index) => (
                                <div
                                  key={exercicio.id}
                                  className="grid grid-cols-12 gap-2 items-center bg-slate-800/50 p-3 rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-700/50"
                                >
                                  <div className="col-span-3">
                                    <CustomDropdown
                                      options={
                                        exerciciosPorTipo[
                                          treino.descripition
                                        ]?.map((exercicioOpt) => ({
                                          value: exercicioOpt.nome,
                                          label: exercicioOpt.nome,
                                        })) || []
                                      }
                                      value={exercicio.nome}
                                      onChange={(e) =>
                                        atualizarExercicio(
                                          treino.id,
                                          exercicio.id,
                                          "nome",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Selecione um exercício"
                                    />
                                  </div>

                                  <div className="col-span-2 text-white p-2 bg-indigo-900/50 rounded-md flex items-center justify-center font-medium border border-indigo-800/30">
                                    {exercicio.subgrupo}
                                  </div>

                                  <div className="col-span-2">
                                    <CustomDropdown
                                      options={[
                                        { value: "3 x 12", label: "3 x 12" },
                                        { value: "4 x 10", label: "4 x 10" },
                                        { value: "3 x 15", label: "3 x 15" },
                                        { value: "5 x 5", label: "5 x 5" },
                                        { value: "3 x 8", label: "3 x 8" },
                                        { value: "4 x 8", label: "4 x 8" },
                                        { value: "3 x 10", label: "3 x 10" },
                                      ]}
                                      value={exercicio.repeticoes}
                                      onChange={(e) =>
                                        atualizarExercicio(
                                          treino.id,
                                          exercicio.id,
                                          "repeticoes",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Selecione repetições"
                                    />
                                  </div>

                                  <div className="col-span-2">
                                    <input
                                      type="number"
                                      className="w-full p-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                                      value={exercicio.peso}
                                      onChange={(e) =>
                                        atualizarExercicio(
                                          treino.id,
                                          exercicio.id,
                                          "peso",
                                          e.target.value
                                        )
                                      }
                                      min="0"
                                      step="0.5"
                                    />
                                  </div>

                                  <div className="col-span-2 text-white p-2 bg-blue-900/50 rounded-md flex items-center justify-center font-medium border border-blue-800/30">
                                    {exercicio.volume}
                                  </div>

                                  <div className="col-span-1 flex justify-center">
                                    <button
                                      onClick={() =>
                                        removerExercicio(
                                          treino.id,
                                          exercicio.id
                                        )
                                      }
                                      className="p-2 rounded-full bg-gradient-to-r from-red-500/70 to-red-700/70 text-white hover:from-red-600 hover:to-red-800 transition-colors"
                                      title="Remover exercício"
                                    >
                                      <Trash size={16} />
                                    </button>
                                  </div>
                                </div>
                              )
                            )}
                          </div>

                          <div className="mt-6 flex justify-center">
                            <button
                              onClick={() => adicionarExercicio(treino.id)}
                              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-2 px-6 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-indigo-800 transition-colors shadow-md transform hover:scale-105 transition-transform"
                            >
                              <PlusCircle size={18} />
                              Adicionar Exercício
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="sticky bottom-6 mt-6 flex justify-center">
                  <button
                    onClick={salvarTreino}
                    disabled={isSaving}
                    className={`py-3 px-8 rounded-xl shadow-xl flex items-center gap-2 font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                      saveSuccess
                        ? "bg-gradient-to-r from-green-600 to-emerald-700"
                        : "bg-gradient-to-r from-blue-600 to-indigo-800 hover:from-blue-700 hover:to-indigo-900"
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Salvando...</span>
                      </>
                    ) : saveSuccess ? (
                      <>
                        <Check size={20} />
                        <span>Treino Salvo!</span>
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        <span>Salvar Treino Completo</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {activeView === "summary" && hasExercicios && (
              <div className="w-full">
                <TreinoTipoSumario
                  treinos={treinos}
                  exerciciosPorTreino={exerciciosPorTreino}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl text-center shadow-lg border border-slate-700 w-full md:w-[80%] mx-auto">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-indigo-900/50 p-4 rounded-full">
                <Info size={40} className="text-blue-300" />
              </div>
              <p className="text-blue-100 text-lg">
                Nenhum treino foi adicionado ou todos os exercícios foram
                removidos. Por favor, vá para a página "Treinos Semanais" e
                adicione seus dias de treino.
              </p>
              <button
                onClick={voltarParaTreinosSemanais}
                className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 px-6 rounded-xl flex items-center gap-2 transition-colors transform hover:scale-105 shadow-lg"
              >
                <ArrowLeft size={16} />
                Ir para Treinos Semanais
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListadeExercicios;
