import { createContext, useContext, useState } from "react";

// Criando o contexto de exercícios
const ExerciciosContext = createContext();

// Provedor do contexto
export const ExerciciosProvider = ({ children }) => {
  const [treinos, setTreinos] = useState([]);

  // Adicionar novos treinos à lista
  const adicionarTreinos = (novosTreinos) => {
    setTreinos(novosTreinos);
  };

  return (
    <ExerciciosContext.Provider
      value={{
        treinos,
        adicionarTreinos,
      }}
    >
      {children}
    </ExerciciosContext.Provider>
  );
};

// Hook para usar o contexto
export const useExercicios = () => useContext(ExerciciosContext);
