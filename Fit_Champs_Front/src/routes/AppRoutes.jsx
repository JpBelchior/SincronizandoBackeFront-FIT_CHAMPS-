import { Routes, Route } from "react-router-dom";
import Home from "../Paginas/Home";
import TreinosSemanais from "../Paginas/TreinosSemanais";
import ListadeExercicios from "../Paginas/ListadeExercicios";
import GraficodeEvolucao from "../Paginas/GraficodeEvolucao";
import Cadastro from "../Paginas/Cadastro";
import Login from "../Paginas/Login";
import RankingSemanal from "../Paginas/RankingSemanal";
import ForgotPassword from "../Paginas/EsqueciSenha";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/TreinosSemanais" element={<TreinosSemanais />} />
      <Route path="/ListadeExercicios" element={<ListadeExercicios />} />
      <Route path="/GraficodeEvolucao" element={<GraficodeEvolucao />} />
      <Route path="/" element={<Login />} />
      <Route path="/Rank" element={<RankingSemanal />} />
      <Route path="/Cadastro" element={<Cadastro />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AppRoutes;
