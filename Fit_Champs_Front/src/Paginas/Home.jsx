import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/ContextoGlobal";
import Header from "../Components/ComponentsHome/Header";
import UserProfileCard from "../Components/ComponentsHome/UserProfileCard";
import MuscleRecordsCard from "../Components/ComponentsHome/MuscleRecordCard";
import EditProfileModal from "../Components/ComponentsHome/EditProfileModal";
import EditGoalModal from "../Components/ComponentsHome/EditGoalModal";

const Home = () => {
  const { isMenuOpen } = useGlobalContext();

  // Dados de exemplo do usuário com IMC adicionado
  const [userData, setUserData] = useState({
    nome: "João Silva",
    foto: "imagem",
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    idade: 28,
    altura: 178,
    peso: 75,
    posicaoRank: 1,
    sexo: "Masculino",
    cidade: "São Paulo",
    imc: { value: null, classification: "" },
  });

  // State para gerenciar os modais
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentEditGroup, setCurrentEditGroup] = useState(null);

  // Dados de exemplo dos recordes de peso
  const [recordesMusculares, setRecordesMusculares] = useState([
    {
      grupo: "Peito",
      recordeVolume: 4000,
      metaVolume: 5000,
      data: "2022-10-10",
    },
    {
      grupo: "Costas",
      recordeVolume: 6100,
      metaVolume: 6000,
      data: "2022-10-11",
    },
    {
      grupo: "Perna",
      recordeVolume: 7200,
      metaVolume: 8000,
      data: "2022-10-12",
    },
    {
      grupo: "Ombro",
      recordeVolume: 2800,
      metaVolume: 4000,
      data: "2022-10-14",
    },
    {
      grupo: "Braço",
      recordeVolume: 1800,
      metaVolume: 3000,
      data: "2022-10-15",
    },
  ]);

  // Calcular IMC quando o componente montar ou quando altura/peso mudar
  useEffect(() => {
    calculateIMC(userData.altura, userData.peso);
  }, [userData.altura, userData.peso]);

  // Função para calcular o IMC e sua classificação
  const calculateIMC = (altura, peso) => {
    if (altura && peso) {
      const heightInMeters = altura / 100;
      const imcValue = (peso / (heightInMeters * heightInMeters)).toFixed(2);
      let classification = "";

      if (imcValue < 18.5) {
        classification = "Abaixo do peso";
      } else if (imcValue >= 18.5 && imcValue < 25) {
        classification = "Peso normal";
      } else if (imcValue >= 25 && imcValue < 30) {
        classification = "Sobrepeso";
      } else if (imcValue >= 30 && imcValue < 35) {
        classification = "Obesidade grau I";
      } else if (imcValue >= 35 && imcValue < 40) {
        classification = "Obesidade grau II";
      } else {
        classification = "Obesidade grau III";
      }

      setUserData((prev) => ({
        ...prev,
        imc: { value: imcValue, classification },
      }));
    }
  };

  // Function to open goal edit modal
  const openGoalModal = (grupo) => {
    setCurrentEditGroup(grupo);
    setIsGoalModalOpen(true);
  };

  // Function to update volume goal
  const updateVolumeGoal = (grupo, newGoal) => {
    setRecordesMusculares((prev) =>
      prev.map((recorde) =>
        recorde.grupo === grupo
          ? { ...recorde, metaVolume: Number(newGoal) }
          : recorde
      )
    );
    setIsGoalModalOpen(false);
  };

  // Função para salvar os dados do usuário
  const handleSaveUserData = (updatedData) => {
    setUserData(updatedData);
    calculateIMC(updatedData.altura, updatedData.peso);
    setIsProfileModalOpen(false);
  };

  return (
    <div className="w-screen h-full flex justify-center bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 p-6">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {/* Cabeçalho moderno */}
        <Header />

        <div className="max-w-6xl mx-auto">
          {/* Cartão de perfil do usuário */}
          <UserProfileCard
            userData={userData}
            openProfileModal={() => setIsProfileModalOpen(true)}
          />

          {/* Cartão de recordes musculares */}
          <MuscleRecordsCard
            recordesMusculares={recordesMusculares}
            openGoalModal={openGoalModal}
          />
        </div>
      </div>

      {/* Volume Goal Edit Modal */}
      {isGoalModalOpen && (
        <EditGoalModal
          grupo={currentEditGroup}
          initialValue={
            recordesMusculares.find((r) => r.grupo === currentEditGroup)
              ?.metaVolume
          }
          onSave={updateVolumeGoal}
          onCancel={() => setIsGoalModalOpen(false)}
        />
      )}

      {/* Modal de Edição de Perfil */}
      {isProfileModalOpen && (
        <EditProfileModal
          userData={userData}
          onSave={handleSaveUserData}
          onCancel={() => setIsProfileModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
