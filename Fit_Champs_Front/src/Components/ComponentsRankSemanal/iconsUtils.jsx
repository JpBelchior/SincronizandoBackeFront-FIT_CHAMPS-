import React from "react";
import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react";

// Importação de imagens locais
import peito from "../../images/peito.png";
import perna from "../../images/perna.png";
import ombro from "../../images/ombro.png";
import costas from "../../images/costas.png";
import braco from "../../images/musculo.png";

// Mapeamento de ícones para importações reais
const ICON_IMPORTS = {
  "peito.png": peito,
  "perna.png": perna,
  "ombro.png": ombro,
  "costas.png": costas,
  "musculo.png": braco,
};

/**
 * Renderiza o ícone apropriado para uma categoria de ranking
 * @param {string} category - Nome da categoria
 * @param {Object} categoryIcons - Mapeamento de categorias para nomes de ícones
 * @returns {JSX.Element} O ícone correspondente à categoria
 */
export const getCategoryIcon = (category, categoryIcons) => {
  const iconKey = categoryIcons[category];

  if (!iconKey) return null;

  if (iconKey === "trophy") {
    return <Trophy className="w-6 h-6 text-yellow-500" />;
  } else {
    const imageSource = ICON_IMPORTS[iconKey];
    if (imageSource) {
      return <img src={imageSource} alt={category} className="w-6 h-6" />;
    }
    return null;
  }
};

/**
 * Obtém ícone de mudança de posição
 * @param {number} current - Posição atual
 * @param {number} previous - Posição anterior
 * @returns {JSX.Element} Ícone de seta para cima, para baixo ou traço
 */
export const getPositionChangeIcon = (current, previous) => {
  const diff = previous - current;
  if (diff > 0) {
    return <ArrowUp className="text-green-500" size={16} />;
  } else if (diff < 0) {
    return <ArrowDown className="text-red-500" size={16} />;
  } else {
    return <Minus className="text-gray-500" size={16} />;
  }
};

/**
 * Formata a mudança de posição como texto
 * @param {number} current - Posição atual
 * @param {number} previous - Posição anterior
 * @returns {string} Texto formatado da mudança de posição
 */
export const formatPositionChange = (current, previous) => {
  const diff = previous - current;
  if (diff > 0) {
    return `+${diff}`;
  } else if (diff < 0) {
    return `${diff}`;
  } else {
    return "=";
  }
};
