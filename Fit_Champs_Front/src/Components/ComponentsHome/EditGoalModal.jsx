import React, { useState, useEffect } from "react";
import { Target, Info, Plus, Minus, X } from "lucide-react";

const EditGoalModal = ({ grupo, initialValue, onSave, onCancel }) => {
  const [goalValue, setGoalValue] = useState(initialValue || 0);
  const [originalValue] = useState(initialValue || 0);
  const [changePercent, setChangePercent] = useState(0);

  // Calcular a porcentagem de mudança quando o valor muda
  useEffect(() => {
    if (originalValue === 0) {
      setChangePercent(0);
    } else {
      const percentChange = ((goalValue - originalValue) / originalValue) * 100;
      setChangePercent(Number(percentChange.toFixed(1)));
    }
  }, [goalValue, originalValue]);

  // Incrementar valor
  const incrementValue = (amount) => {
    setGoalValue((prev) => Math.max(0, Number(prev) + amount));
  };

  // Lidar com as alterações no input direto
  const handleInputChange = (e) => {
    const value = e.target.value === "" ? 0 : Number(e.target.value);
    if (value >= 0) {
      setGoalValue(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl w-full max-w-md p-6 border border-slate-600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Target className="mr-3 text-blue-400" size={24} />
            Editar Meta - {grupo}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white hover:bg-slate-700 rounded-full p-1.5 transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center text-blue-200 mb-2">
            <Info size={16} className="mr-2" />
            <span className="text-sm">
              Defina uma nova meta de volume para seus treinos de{" "}
              {grupo.toLowerCase()}.
            </span>
          </div>
          <div className="text-sm text-slate-400">
            Meta atual:{" "}
            <span className="text-white font-medium">{originalValue}</span>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="volumeGoal"
            className="block text-slate-300 text-sm font-medium mb-2"
          >
            Meta de Volume
          </label>

          <div className="flex items-center">
            <button
              onClick={() => incrementValue(-100)}
              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-l-lg transition-colors"
              disabled={goalValue <= 0}
            >
              <Minus size={20} />
            </button>

            <input
              type="number"
              id="volumeGoal"
              value={goalValue}
              onChange={handleInputChange}
              className="w-full bg-slate-700 border-y border-slate-600 py-3 px-4 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              step="100"
            />

            <button
              onClick={() => incrementValue(100)}
              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-r-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          {changePercent !== 0 && (
            <div
              className={`mt-2 text-sm flex items-center justify-end ${
                changePercent > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              <span>
                {changePercent > 0 ? "+" : ""}
                {changePercent}% em relação à meta atual
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onCancel}
            className="bg-slate-700 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-slate-600 transition-colors"
          >
            Cancelar
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setGoalValue(originalValue)}
              className="border border-slate-600 text-slate-300 font-medium py-2.5 px-4 rounded-lg hover:bg-slate-700 transition-colors"
              disabled={goalValue === originalValue}
            >
              Restaurar
            </button>
            <button
              onClick={() => onSave(grupo, goalValue)}
              className={`${
                goalValue !== originalValue
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                  : "bg-slate-700"
              } text-white font-medium py-2.5 px-6 rounded-lg transition-all shadow-lg hover:shadow-blue-900/20`}
              disabled={goalValue === originalValue}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGoalModal;
