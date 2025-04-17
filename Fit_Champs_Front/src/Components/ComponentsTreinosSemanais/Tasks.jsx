import {
  PlusCircleIcon,
  TrashIcon,
  Calendar,
  Dumbbell,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";

function Tasks({ initialTasks = [], onTasksUpdate, weekStartDate }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedOptions, setSelectedOptions] = useState({});

  const calculateTaskDate = (dayOfWeek, startDate) => {
    const [day, month, year] = startDate.split("-").map(Number);
    const baseDate = new Date(2000 + year, month - 1, day);

    const dayOffsets = {
      Domingo: 0,
      "Segunda-feira": 1,
      "Terça-feira": 2,
      "Quarta-feira": 3,
      "Quinta-feira": 4,
      "Sexta-feira": 5,
      Sábado: 6,
    };

    const taskDate = new Date(baseDate);
    taskDate.setDate(baseDate.getDate() + dayOffsets[dayOfWeek]);

    return `${taskDate.getDate().toString().padStart(2, "0")}-${(
      taskDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${taskDate.getFullYear().toString().slice(-2)}`;
  };

  const [newTask, setNewTask] = useState({
    id: null,
    text: "Segunda-feira",
    descripition: "Treino de Peito",
    Nexercicio: 1,
    reminder: false,
    volumedetreino: 0,
    data: calculateTaskDate("Segunda-feira", weekStartDate),
  });

  useEffect(() => {
    if (onTasksUpdate) {
      onTasksUpdate(tasks);
    }
  }, [tasks, onTasksUpdate]);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTaskWithId = {
      ...task,
      id,
      data: calculateTaskDate(task.text, weekStartDate),
    };
    setTasks([...tasks, newTaskWithId]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSelectChange = (id, field, value) => {
    setSelectedOptions({ ...selectedOptions, [`${id}-${field}`]: value });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          [field]: value,
          ...(field === "text"
            ? { data: calculateTaskDate(value, weekStartDate) }
            : {}),
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
      ...(name === "text"
        ? {
            data: calculateTaskDate(value, weekStartDate),
          }
        : {}),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.text) {
      alert("Por favor, adicione um dia da semana");
      return;
    }
    addTask(newTask);
    setNewTask({
      text: "Segunda-feira",
      descripition: "Treino de Peito",
      Nexercicio: 1,
      reminder: false,
      volumedetreino: 0,
      data: calculateTaskDate("Segunda-feira", weekStartDate),
    });
  };

  // Define a cor de fundo com base no tipo de treino
  const getTrainingTypeColor = (type) => {
    switch (type) {
      case "Treino de Peito":
        return "from-blue-700 to-blue-900";
      case "Treino de Costas":
        return "from-green-700 to-green-900";
      case "Treino de Braço":
        return "from-amber-700 to-amber-900";
      case "Treino de Perna":
        return "from-purple-700 to-purple-900";
      case "Treino de Ombro":
        return "from-pink-700 to-pink-900";
      case "Day Off":
        return "from-gray-700 to-gray-900";
      default:
        return "from-sky-700 to-sky-900";
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 p-6 shadow-lg rounded-xl border border-neutral-700">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
          <Dumbbell className="text-blue-300 mr-2" size={24} />
          Adicionar Novo Treino
        </h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="transition-all duration-200 hover:shadow-md">
              <label className="block text-blue-100 mb-2 font-semibold flex items-center">
                <Calendar className="text-blue-300 mr-2" size={18} />
                Dia da Semana
              </label>
              <select
                name="text"
                value={newTask.text}
                onChange={handleInputChange}
                className="w-full p-3 bg-sky-950 text-white rounded-lg border border-sky-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="Segunda-feira">Segunda-feira</option>
                <option value="Terça-feira">Terça-feira</option>
                <option value="Quarta-feira">Quarta-feira</option>
                <option value="Quinta-feira">Quinta-feira</option>
                <option value="Sexta-feira">Sexta-feira</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>

            <div className="transition-all duration-200 hover:shadow-md">
              <label className="block text-blue-100 mb-2 font-semibold flex items-center">
                <Dumbbell className="text-blue-300 mr-2" size={18} />
                Tipo de Treino
              </label>
              <select
                name="descripition"
                value={newTask.descripition}
                onChange={handleInputChange}
                className="w-full p-3 bg-sky-950 text-white rounded-lg border border-sky-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="Treino de Peito">Peito</option>
                <option value="Treino de Costas">Costas</option>
                <option value="Treino de Braço">Braço</option>
                <option value="Treino de Perna">Perna</option>
                <option value="Treino de Ombro">Ombro</option>
                <option value="Day Off">Day Off</option>
              </select>
            </div>

            <div className="transition-all duration-200 hover:shadow-md">
              <label className="block text-blue-100 mb-2 font-semibold flex items-center">
                <CheckCircle className="text-blue-300 mr-2" size={18} />
                Número de Exercícios
              </label>
              <select
                name="Nexercicio"
                value={newTask.Nexercicio}
                onChange={handleInputChange}
                className="w-full p-3 bg-sky-950 text-white rounded-lg border border-sky-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {[...Array(10).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-900 text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg transform hover:scale-105 font-bold"
            >
              <PlusCircleIcon size={24} />
              Adicionar Treino
            </button>
          </div>
        </form>
      </div>

      {tasks.length > 0 ? (
        <div className="bg-gradient-to-r from-sky-900/50 to-indigo-900/50 p-6 shadow-lg rounded-xl mt-6 border border-sky-800/50">
          <div className="space-y-4">
            <h3 className="font-bold text-2xl text-white mb-4 flex items-center">
              <Clock className="text-blue-300 mr-2" size={24} />
              Treinos Programados:
            </h3>
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-800 
                 rounded-lg p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all duration-300 border border-slate-700 transform hover:scale-[1.01]`}
                >
                  <div className="flex-grow mr-4">
                    <p className="text-white font-semibold text-lg flex items-center">
                      <Calendar className="text-blue-200 mr-2" size={18} />
                      {task.text} - {task.descripition}
                    </p>
                    <p className="text-blue-100 text-sm mt-1 flex items-center">
                      <CheckCircle className="text-green-300 mr-2" size={14} />
                      Data: {task.data} | {task.Nexercicio} exercícios
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 rounded-full bg-slate-700 text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-110 shadow-md"
                      aria-label="Remover treino"
                    >
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-sky-900/50 to-indigo-900/50 p-6 shadow-lg rounded-xl mt-6 border border-sky-800/50">
          <p className="text-blue-100 text-center text-lg flex items-center justify-center">
            <Calendar className="text-blue-300 mr-2" size={20} />
            Nenhum treino adicionado para esta semana.
          </p>
        </div>
      )}
    </div>
  );
}

export default Tasks;
