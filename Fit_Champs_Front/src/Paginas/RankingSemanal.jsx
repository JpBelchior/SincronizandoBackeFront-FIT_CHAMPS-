import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "../Context/ContextoGlobal";

// Importação dos componentes
import RankingHeader from "../Components/ComponentsRankSemanal/RankingHeader";
import UserProfileSummary from "../Components/ComponentsRankSemanal/UserProfileSummary";
import FilterBar from "../Components/ComponentsRankSemanal/FilterBar";
import CategoryTabs from "../Components/ComponentsRankSemanal/CategoryTabs";
import RankingTable from "../Components/ComponentsRankSemanal/RankingTable";
import RankingCounter from "../Components/ComponentsRankSemanal/RankingCounter";

// Importação dos dados constantes
import {
  RANKING_DATA,
  SEXOS,
  FAIXAS_ETARIAS,
  CATEGORY_ICONS,
} from "../Classes/usuarioprorank";

// Função para renderizar ícone de categoria - movida para um utilitário
import { getCategoryIcon } from "../Components/ComponentsRankSemanal/iconsUtils";

const RankingSemanal = () => {
  const { isMenuOpen } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Geral");
  const [userData, setUserData] = useState(null);
  const [activeSexo, setActiveSexo] = useState("Masculino");
  const [activeFaixaEtaria, setActiveFaixaEtaria] = useState("20-40");
  const [rankingData, setRankingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // ID do usuário atual (seria obtido por autenticação em uma aplicação real)
  const currentUserId = "user123";

  // Função para filtrar os rankings por sexo e faixa etária
  const filtrarRankings = (sexo, faixaEtaria) => {
    setIsLoading(true);

    const faixa = FAIXAS_ETARIAS.find((f) => f.id === faixaEtaria);
    if (!faixa) return {};

    const { min, max } = faixa.range;
    const rankingsFiltrados = {};

    // Simular uma chamada de API real com um pequeno atraso
    setTimeout(() => {
      // Filtrar cada categoria
      Object.keys(RANKING_DATA).forEach((category) => {
        const usuariosFiltrados = RANKING_DATA[category]
          .filter(
            (user) =>
              user.sexo === sexo && user.idade >= min && user.idade < max
          )
          .sort((a, b) => b.pontos - a.pontos)
          .slice(0, 5);

        // Atualizar a posição atual
        usuariosFiltrados.forEach((user, index) => {
          user.posicaoAtual = index + 1;
        });

        rankingsFiltrados[category] = usuariosFiltrados;
      });

      setRankingData(rankingsFiltrados);
      setIsLoading(false);
    }, 300);
  };

  // Atualizar rankings quando o sexo ou faixa etária mudar
  useEffect(() => {
    filtrarRankings(activeSexo, activeFaixaEtaria);
  }, [activeSexo, activeFaixaEtaria]);

  // Efeito para encontrar os dados do usuário atual em cada ranking
  useEffect(() => {
    if (Object.keys(rankingData).length === 0) return;

    const userRankings = {};

    Object.keys(rankingData).forEach((category) => {
      const ranking = rankingData[category];
      const userIndex = ranking.findIndex((user) => user.id === currentUserId);

      if (userIndex !== -1) {
        userRankings[category] = {
          posicao: userIndex + 1,
          pontos: ranking[userIndex].pontos,
          total: ranking.length,
          posicaoAnterior: ranking[userIndex].posicaoAnterior,
        };
      }
    });

    setUserData(userRankings);
  }, [currentUserId, rankingData]);

  // Obter sexo e faixa etária do usuário atual
  const userInfo = useMemo(() => {
    // Procurar usuário no ranking geral
    const user = RANKING_DATA.Geral.find((u) => u.id === currentUserId);
    if (!user) return { sexo: "Desconhecido", faixaEtaria: "Desconhecida" };

    // Determinar a faixa etária
    const faixaEtaria =
      FAIXAS_ETARIAS.find(
        (f) => user.idade >= f.range.min && user.idade < f.range.max
      )?.id || "Desconhecida";

    return { sexo: user.sexo, faixaEtaria };
  }, [currentUserId]);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 flex justify-center p-6 overflow-y-auto">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {/* Cabeçalho */}
        <RankingHeader />

        {/* Resumo do perfil do usuário com suas posições no ranking */}
        {userData && (
          <UserProfileSummary
            userData={userData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            renderCategoryIcon={(category) =>
              getCategoryIcon(category, CATEGORY_ICONS)
            }
          />
        )}

        {/* Área de filtros */}
        <FilterBar
          sexos={SEXOS}
          faixasEtarias={FAIXAS_ETARIAS}
          activeSexo={activeSexo}
          activeFaixaEtaria={activeFaixaEtaria}
          setActiveSexo={setActiveSexo}
          setActiveFaixaEtaria={setActiveFaixaEtaria}
          userInfo={userInfo}
        />

        {/* Tabs para navegação entre categorias */}
        <CategoryTabs
          categories={Object.keys(rankingData)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          renderCategoryIcon={(category) =>
            getCategoryIcon(category, CATEGORY_ICONS)
          }
        />

        {/* Tabela de ranking */}
        <RankingTable
          activeTab={activeTab}
          activeSexo={activeSexo}
          activeFaixaEtaria={activeFaixaEtaria}
          rankingData={rankingData}
          isLoading={isLoading}
          currentUserId={currentUserId}
        />

        {/* Contador de rankings ativos */}
        {userData && Object.keys(userData).length > 0 && (
          <RankingCounter count={Object.keys(userData).length} />
        )}
      </div>
    </div>
  );
};

export default RankingSemanal;
