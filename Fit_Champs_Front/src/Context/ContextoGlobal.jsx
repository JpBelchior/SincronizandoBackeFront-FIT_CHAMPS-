import { createContext, useContext, useState } from "react";

// Criando o contexto
const GlobalContext = createContext();

// Provedor do contexto
export const GlobalProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // O menu começa fechado

  return (
    <GlobalContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para usar o contexto
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
