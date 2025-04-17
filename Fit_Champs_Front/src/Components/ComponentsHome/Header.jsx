import React from "react";
import { User } from "lucide-react";

const Header = () => {
  return (
    <div className="text-center bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-6 rounded-2xl w-full md:w-[80%] mx-auto mb-6 shadow-xl border border-indigo-500/30 backdrop-blur-sm">
      <div className="flex justify-center items-center gap-3 mb-2">
        <User className="text-blue-400" size={32} />
        <h1 className="text-3xl font-bold text-white">Dashboard Pessoal</h1>
      </div>
      <p className="text-blue-200 mt-2 text-lg">
        Bem-vindo à sua academia virtual personalizada!
      </p>
    </div>
  );
};

export default Header;
