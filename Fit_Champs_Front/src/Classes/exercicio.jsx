// Banco de dados de exercícios por tipo de treino com subgrupos musculares
const exerciciosPorTipo = {
  "Treino de Peito": [
    { nome: "Supino Reto", subgrupo: "Peitoral Médio" },
    { nome: "Supino Inclinado", subgrupo: "Peitoral Superior" },
    { nome: "Supino Declinado", subgrupo: "Peitoral Inferior" },
    { nome: "Crucifixo", subgrupo: "Peitoral Geral" },
    { nome: "Crossover", subgrupo: "Peitoral Inferior" },
    { nome: "Flexão", subgrupo: "Peitoral Geral" },
    { nome: "Peck Deck", subgrupo: "Peitoral Lateral" },
    { nome: "Pullover", subgrupo: "Peitoral Superior/Serrátil" },
    { nome: "Voador", subgrupo: "Peitoral Lateral" },
    { nome: "Supino Hammer", subgrupo: "Peitoral Médio" },
    { nome: "Supino com Halteres", subgrupo: "Peitoral Médio" },
    { nome: "Push-Up com Peso", subgrupo: "Peitoral Médio" },
    { nome: "Paralelas", subgrupo: "Peitoral Inferior" },
    { nome: "Cross-Bench Pullover", subgrupo: "Peitoral Superior" },
    { nome: "Cable Fly", subgrupo: "Peitoral Lateral" },
  ],
  "Treino de Costas": [
    { nome: "Puxada Frente", subgrupo: "Latíssimo" },
    { nome: "Remada Baixa", subgrupo: "Dorsal Médio" },
    { nome: "Remada Curvada", subgrupo: "Dorsal Inferior" },
    { nome: "Pulldown", subgrupo: "Latíssimo/Trapézio" },
    { nome: "Barra Fixa", subgrupo: "Latíssimo/Rombóides" },
    { nome: "Remada Unilateral", subgrupo: "Dorsal Lateral" },
    { nome: "Remada Cavalinho", subgrupo: "Dorsal Médio" },
    { nome: "Puxada Alta", subgrupo: "Trapézio/Rombóides" },
    { nome: "Pull-Up", subgrupo: "Latíssimo" },
    { nome: "Remada T", subgrupo: "Dorsal Médio/Trapézio" },
    { nome: "Face Pull", subgrupo: "Deltóide Posterior/Trapézio" },
    { nome: "Hiperextensão", subgrupo: "Eretores da Espinha" },
    { nome: "Good Morning", subgrupo: "Eretores da Espinha" },
    { nome: "Remada Baixa Neutra", subgrupo: "Dorsal Inferior" },
    { nome: "Remada com Corda", subgrupo: "Dorsal Médio" },
    { nome: "Pulldown com Corda", subgrupo: "Latíssimo" },
    { nome: "Australian Pull-Up", subgrupo: "Dorsal Médio/Latíssimo" },
  ],
  "Treino de Braço": [
    { nome: "Rosca Direta", subgrupo: "Bíceps" },
    { nome: "Rosca Alternada", subgrupo: "Bíceps/Braquial" },
    { nome: "Rosca Martelo", subgrupo: "Braquiorradial" },
    { nome: "Tríceps Corda", subgrupo: "Tríceps Lateral" },
    { nome: "Tríceps Francês", subgrupo: "Tríceps Longo" },
    { nome: "Tríceps Testa", subgrupo: "Tríceps Médio" },
    { nome: "Rosca Scott", subgrupo: "Bíceps Cabeça Curta" },
    { nome: "Rosca Concentrada", subgrupo: "Bíceps Pico" },
    { nome: "Rosca 21", subgrupo: "Bíceps Completo" },
    { nome: "Rosca W", subgrupo: "Bíceps Cabeça Longa" },
    { nome: "Tríceps Coice", subgrupo: "Tríceps Lateral" },
    { nome: "Tríceps Mergulho", subgrupo: "Tríceps Geral" },
    { nome: "Tríceps Barra", subgrupo: "Tríceps Longo" },
    { nome: "Extensão Overhead", subgrupo: "Tríceps Longo" },
    { nome: "Kickback", subgrupo: "Tríceps Lateral" },
    { nome: "Rosca Inversa", subgrupo: "Braquiorradial" },
    { nome: "Rosca Spider", subgrupo: "Bíceps Cabeça Longa" },
    { nome: "Rosca Zottman", subgrupo: "Bíceps/Antebraço" },
    { nome: "Dips", subgrupo: "Tríceps Lateral" },
  ],
  "Treino de Perna": [
    { nome: "Agachamento", subgrupo: "Quadríceps/Glúteos" },
    { nome: "Leg Press", subgrupo: "Quadríceps" },
    { nome: "Cadeira Extensora", subgrupo: "Quadríceps" },
    { nome: "Cadeira Flexora", subgrupo: "Isquiotibiais" },
    { nome: "Panturrilha", subgrupo: "Gastrocnêmio" },
    { nome: "Stiff", subgrupo: "Isquiotibiais/Glúteos" },
    { nome: "Avanço", subgrupo: "Quadríceps/Glúteos" },
    { nome: "Hack Squat", subgrupo: "Quadríceps" },
    { nome: "Afundo", subgrupo: "Glúteos/Quadríceps" },
    { nome: "Cadeira Adutora", subgrupo: "Adutores" },
    { nome: "Cadeira Abdutora", subgrupo: "Abdutores" },
    { nome: "Agachamento Sumô", subgrupo: "Glúteos/Adutores" },
    { nome: "Leg Press 45°", subgrupo: "Quadríceps/Glúteos" },
    { nome: "Panturrilha Sentado", subgrupo: "Sóleo" },
    { nome: "Elevação Pélvica", subgrupo: "Glúteos" },
    { nome: "Bulgarian Split Squat", subgrupo: "Quadríceps/Glúteos" },
    { nome: "Agachamento Frontal", subgrupo: "Quadríceps" },
    { nome: "Passada", subgrupo: "Glúteos/Quadríceps" },
    { nome: "Good Girl/Bad Girl", subgrupo: "Adutores/Abdutores" },
    { nome: "Hip Thrust", subgrupo: "Glúteos" },
    { nome: "Panturrilha no Smith", subgrupo: "Gastrocnêmio" },
    { nome: "Leg Curl Unilateral", subgrupo: "Isquiotibiais" },
  ],
  "Treino de Ombro": [
    { nome: "Desenvolvimento", subgrupo: "Deltóide Anterior" },
    { nome: "Elevação Lateral", subgrupo: "Deltóide Lateral" },
    { nome: "Elevação Frontal", subgrupo: "Deltóide Anterior" },
    { nome: "Face Pull", subgrupo: "Deltóide Posterior" },
    { nome: "Encolhimento", subgrupo: "Trapézio" },
    { nome: "Arnold Press", subgrupo: "Deltóide Geral" },
    { nome: "Desenvolvimento Militar", subgrupo: "Deltóide Anterior" },
    { nome: "Desenvolvimento com Halteres", subgrupo: "Deltóide Geral" },
    { nome: "Crucifixo Invertido", subgrupo: "Deltóide Posterior" },
    { nome: "Pássaro", subgrupo: "Deltóide Posterior" },
    { nome: "Elevação Lateral na Polia", subgrupo: "Deltóide Lateral" },
    { nome: "Desenvolvimento na Máquina", subgrupo: "Deltóide Anterior" },
    { nome: "Remada Alta", subgrupo: "Trapézio/Deltóide Lateral" },
    { nome: "Desenvolvimento Sentado", subgrupo: "Deltóide Geral" },
    { nome: "Shrugs com Halteres", subgrupo: "Trapézio" },
    { nome: "W-Raise", subgrupo: "Deltóide Posterior" },
  ],
  "Day Off": [],
};

// Função para obter exercícios por tipo de treino
export const getExerciciosPorTipo = (tipoTreino) => {
  return exerciciosPorTipo[tipoTreino] || [];
};

// Função para obter todos os tipos de treino disponíveis
export const getTiposTreino = () => {
  return Object.keys(exerciciosPorTipo);
};

// Função para obter todos os exercícios
export const getAllExercicios = () => {
  return exerciciosPorTipo;
};

// Função para encontrar um exercício específico pelo nome e tipo
export const encontrarExercicio = (tipoTreino, nomeExercicio) => {
  const exerciciosList = exerciciosPorTipo[tipoTreino] || [];
  return exerciciosList.find((ex) => ex.nome === nomeExercicio);
};

export default exerciciosPorTipo;
