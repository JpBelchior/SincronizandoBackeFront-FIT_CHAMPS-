import React from "react";
// Importações das imagens
import peito from "../../images/peito.png";
import perna from "../../images/perna.png";
import ombro from "../../images/ombro.png";
import costas from "../../images/costas.png";
import braco from "../../images/musculo.png";

export const getGroupIcon = (grupo) => {
  switch (grupo.toLowerCase()) {
    case "peito":
      return <img src={peito} alt="Peito" className="w-8 h-8" />;
    case "perna":
      return <img src={perna} alt="Perna" className="w-8 h-8" />;
    case "ombro":
      return <img src={ombro} alt="Ombro" className="w-8 h-8" />;
    case "costas":
      return <img src={costas} alt="Costas" className="w-8 h-8" />;
    case "braço":
      return <img src={braco} alt="Braço" className="w-8 h-8" />;
    default:
      return null;
  }
};
