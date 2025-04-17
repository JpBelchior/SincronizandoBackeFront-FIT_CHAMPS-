import {
  LucideArrowBigLeftDash,
  LucideBicepsFlexed,
  LucideCalendarDays,
  LucideChartLine,
  LucideHome,
  Menu,
  TrophyIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../Context/ContextoGlobal"; // Importa o contexto global

function BarraMenu() {
  const { isMenuOpen, setIsMenuOpen } = useGlobalContext(); // Usa o contexto

  return (
    <div className="relative h-screen">
      {/* Botão só aparece quando o menu está fechado */}
      {!isMenuOpen && (
        <button
          className="fixed top-1 left-6 p-2  rounded-lg text-white flex z-50 hover:bg-slate-600 font-semibold"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} className="p-1" /> MENU
        </button>
      )}

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64b bg-slate-900 text-white font-bold p-5 transform ${
          isMenuOpen ? "translate-x-0 " : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <nav className="mt-4">
          <ul className="space-y-3 mt-12">
            <li className=" hover:bg-slate-600 p-2 rounded-lg cursor-pointer">
              <NavLink to="/Home" className="text-white flex gap-2">
                Home <LucideHome size={16} className="mt-1" />
              </NavLink>
            </li>
            <li className=" hover:bg-slate-600 p-2 rounded-lg cursor-pointer">
              <NavLink to="/TreinosSemanais" className="text-white flex gap-2">
                Treinos da Semana{" "}
                <LucideCalendarDays size={16} className="mt-1" />
              </NavLink>
            </li>
            <li className=" hover:bg-slate-600 p-2 rounded-lg cursor-pointer">
              <NavLink
                to="/ListadeExercicios"
                className="text-white flex gap-2"
              >
                Lista de Exercícios{" "}
                <LucideBicepsFlexed size={16} className="mt-1" />
              </NavLink>
            </li>
            <li className=" hover:bg-slate-600 p-2 rounded-lg cursor-pointer">
              <NavLink
                to="/GraficodeEvolucao"
                className="text-white flex gap-2"
              >
                Gráficos de evolução{" "}
                <LucideChartLine size={16} className="mt-1" />
              </NavLink>
            </li>
            <li className=" hover:bg-slate-600 p-2 rounded-lg cursor-pointer">
              <NavLink to="/Rank" className="text-white flex gap-2">
                Rank Semanal <TrophyIcon size={16} className="mt-1" />
              </NavLink>
            </li>

            <div className="mt-10">
              <button
                className="absolute text-white mt-3 p-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <LucideArrowBigLeftDash
                  size={24}
                  className="hover:bg-slate-600 rounded-lg "
                />
              </button>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BarraMenu;
