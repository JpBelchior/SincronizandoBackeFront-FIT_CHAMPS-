import React, { useState, useEffect } from "react";
import Tasks from "../Components/ComponentsTreinosSemanais/Tasks";
import { useGlobalContext } from "../Context/ContextoGlobal";
import { useExercicios } from "../Context/ExerciciosContext";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Dumbbell,
  ChevronRight,
  ArrowBigRight,
  ChevronLeft,
  ListChecks,
  Activity,
  Trophy,
} from "lucide-react";

function TreinosSemanais() {
  const { isMenuOpen } = useGlobalContext();
  const { adicionarTreinos } = useExercicios();
  const navigate = useNavigate();
  const [tasksList, setTasksList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWeekRange = () => {
    const currentDate = new Date();
    const startOfWeek = currentDate.getDate() - currentDate.getDay(); // Domingo
    const endOfWeek = startOfWeek + 6; // Sábado

    const start = new Date(currentDate.setDate(startOfWeek));
    const end = new Date(currentDate.setDate(endOfWeek));

    return {
      start: start.toLocaleDateString(),
      end: end.toLocaleDateString(),
    };
  };

  const [weekRange, setWeekRange] = useState(getWeekRange());
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  useEffect(() => {
    setWeekRange(getWeekRange());
  }, []);

  const enviarParaListaExercicios = () => {
    if (tasksList.length === 0) {
      alert("Adicione pelo menos um treino antes de continuar");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      adicionarTreinos(tasksList);
      navigate("/ListadeExercicios");
    }, 500);
  };

  const atualizarTasks = (tasks) => {
    setTasksList(tasks);
  };

  const changeWeek = (offset) => {
    const newOffset = currentWeekOffset + offset;

    if (newOffset > 0) return;

    setCurrentWeekOffset(newOffset);
    const currentDate = new Date();
    const startOfCurrentWeek = currentDate.getDate() - currentDate.getDay();
    const newStartDate = new Date(
      currentDate.setDate(startOfCurrentWeek + 7 * newOffset)
    );
    const newEndDate = new Date(
      new Date(newStartDate).setDate(newStartDate.getDate() + 6)
    );

    setWeekRange({
      start: newStartDate.toLocaleDateString(),
      end: newEndDate.toLocaleDateString(),
    });
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 flex justify-center p-6 overflow-y-auto">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {/* Header modernizado */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-6 rounded-2xl mb-6 shadow-xl border border-indigo-500/30 backdrop-blur-sm w-full md:w-[90%] lg:w-[80%] mx-auto">
          <div className="flex items-center justify-center mb-3">
            <Calendar className="text-blue-400 mr-2" size={32} />
            <h1 className="text-3xl text-white font-bold">Treinos Semanais</h1>
          </div>

          <p className="text-blue-200 mt-2 text-lg text-center">
            Planeje seus treinos para alcançar seus objetivos!
          </p>

          <div className="flex items-center justify-center gap-4 my-5">
            <button
              onClick={() => changeWeek(-1)}
              className="bg-sky-800 hover:bg-sky-700 p-3 rounded-full text-white shadow-lg transition-all duration-300 transform hover:scale-110"
              aria-label="Semana anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="bg-gradient-to-r from-sky-800 to-indigo-800 px-6 py-3 rounded-lg shadow-lg border border-sky-700/50">
              <p className="text-blue-100 text-center font-medium">
                {weekRange.start} - {weekRange.end}
              </p>
            </div>

            <button
              onClick={() => changeWeek(1)}
              className={`bg-sky-800 hover:bg-sky-700 p-3 rounded-full text-white shadow-lg transition-all duration-300 transform hover:scale-110 ${
                currentWeekOffset === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentWeekOffset === 0}
              aria-label="Próxima semana"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="bg-gradient-to-r from-sky-900/70 to-indigo-900/70 p-4 rounded-lg shadow-inner border border-sky-700/50 mt-4">
            <div className="flex items-center justify-center gap-3">
              <Dumbbell className="text-blue-300" size={24} />
              <p className="text-blue-100 font-semibold">
                Adicione seus dias de treino para esta semana!
              </p>
            </div>
          </div>
        </div>

        {/* Componente Tasks */}
        <div className="w-full md:w-[90%] lg:w-[80%] mx-auto">
          <Tasks
            initialTasks={[]}
            onTasksUpdate={atualizarTasks}
            weekStartDate={weekRange.start.replace(/\//g, "-")}
          />
        </div>

        {/* Botão de continuar modernizado */}
        <div className="sticky bottom-6 mt-8 flex justify-center w-full md:w-[90%] lg:w-[80%] mx-auto">
          <button
            onClick={enviarParaListaExercicios}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                <span>Processando...</span>
              </>
            ) : (
              <>
                <span>Continuar para Seleção de Exercícios</span>
                <ArrowBigRight size={24} />
              </>
            )}
          </button>
        </div>

        {/* Contador de treinos */}
        {tasksList.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <div className="bg-gradient-to-r from-sky-700 to-indigo-700 text-white p-3 rounded-full shadow-lg flex items-center gap-2 transform hover:scale-110 transition-all duration-300 border border-sky-600">
              <ListChecks size={18} className="text-blue-200" />
              <span className="px-1 font-bold">{tasksList.length}</span>
              <span className="text-sm font-medium">treinos</span>
            </div>
          </div>
        )}

        {/* Dicas de treino */}
        {tasksList.length > 0 && (
          <div className="w-full md:w-[90%] lg:w-[80%] mx-auto mt-6 mb-20">
            <div className="bg-gradient-to-r from-sky-900/50 to-indigo-900/50 p-5 rounded-xl shadow-lg border border-sky-800/30">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <Trophy className="text-yellow-400 mr-2" size={22} />
                Dicas para seus treinos
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-sky-900/30 p-3 rounded-lg border border-sky-800/30 flex items-start">
                  <Activity
                    className="text-blue-300 mr-2 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <p className="text-blue-100 text-sm">
                    Lembre-se de manter intensidade adequada durante seus
                    exercícios para obter melhores resultados.
                  </p>
                </div>

                <div className="bg-sky-900/30 p-3 rounded-lg border border-sky-800/30 flex items-start">
                  <Dumbbell
                    className="text-blue-300 mr-2 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <p className="text-blue-100 text-sm">
                    Planeje seus treinos para garantir descanso adequado entre
                    grupos musculares semelhantes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TreinosSemanais;
