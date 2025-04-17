import React from "react";
import { LucideBell, LucideSettings, LucideLogOut } from "lucide-react";
import icone from "../images/icone.png";
import { NavLink } from "react-router-dom";

function TopMenu({ userPhoto, onLogout }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950 to-slate-800 flex justify-between items-center z-40 px-4">
      {/* Espaço para o logo ou título (caso queira adicionar) */}
      <div></div>
      <div className="text-white font-bold ml-12 flex gap-2">
        <p className="mt-2 ml-2 ml-20">FIT CHAMPS</p>{" "}
        <img src={icone} alt="icone" className="h-8 w-8 mb-3 "></img>
      </div>
      {/* Área direita com ícones e usuário */}
      <div className="flex items-center space-x-4">
        {/* Ícone de notificações */}
        <button className="relative text-white hover:bg-slate-600 p-1 rounded-full">
          <LucideBell size={20} />
          <span className="absolute -top-1 -right-1 bg-neutral-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Ícone de configurações */}
        <button className="text-white hover:bg-slate-600 p-1 rounded-full">
          <LucideSettings size={20} />
        </button>

        {/* Botão de logout */}
        <button
          onClick={onLogout}
          className="relative text-white hover:bg-slate-600 p-1 rounded-full"
        >
          <NavLink to="/" className="text-white flex gap-2">
            Sair <LucideLogOut size={16} className="mt-1" />
          </NavLink>
        </button>

        {/* Informações do usuário */}
        <div className="flex items-center">
          <img
            src={userPhoto || "/placeholder-user.png"}
            alt="User"
            className="w-8 h-8 rounded-full object-cover border-2 border-white"
          />
          <p className="text-white ml-2 hidden sm:block">Usuario </p>
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
