import React from "react";
import { User, Info, ActivitySquare, Edit } from "lucide-react";
import IMCSection from "./IMCSection";
import UserRankings from "./UserRankings";

const UserProfileCard = ({ userData, openProfileModal }) => {
  return (
    <div className="bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 border border-slate-700 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-xl">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-6 rounded-lg mb-6 border border-indigo-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Olá, {userData.nome}!
            </h2>
            <p className="text-blue-300">{userData.email}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-full shadow-lg transform hover:scale-105 transition-transform border border-indigo-500/50">
            <User className="h-12 w-12 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-white border-b border-slate-700 pb-2 flex items-center">
            <Info className="mr-2 text-blue-400" size={20} />
            Informações Pessoais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="font-medium text-slate-400 w-24">Telefone:</span>
              <span className="text-blue-100">{userData.telefone}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-slate-400 w-24">Idade:</span>
              <span className="text-blue-100">{userData.idade} anos</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-slate-400 w-24">Altura:</span>
              <span className="text-blue-100">{userData.altura} cm</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-slate-400 w-24">Peso:</span>
              <span className="text-blue-100">{userData.peso} kg</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-slate-400 w-24">Cidade:</span>
              <span className="text-blue-100">{userData.cidade}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-slate-400 w-24">Sexo:</span>
              <span className="text-blue-100">{userData.sexo}</span>
            </div>
          </div>

          <IMCSection imc={userData.imc} />

          <div className="mt-6 flex justify-center">
            <button
              className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-blue-900/50 hover:scale-105 flex items-center gap-2"
              onClick={openProfileModal}
            >
              <Edit size={16} />
              Atualizar Perfil
            </button>
          </div>
        </div>

        <UserRankings userData={userData} />
      </div>
    </div>
  );
};

export default UserProfileCard;
