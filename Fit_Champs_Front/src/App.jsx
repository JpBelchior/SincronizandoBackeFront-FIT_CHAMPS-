import React from "react";
import BarraMenu from "./Components/BarraMenu";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import TopMenu from "./Components/TopMenu";
import { GlobalProvider } from "./Context/ContextoGlobal"; // Importa o contexto global
import { ExerciciosProvider } from "./Context/ExerciciosContext"; // Importa o contexto de exercícios

function Layout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isCadastroPage = location.pathname === "/Cadastro";
  const isForgotPasswordPage = location.pathname === "/ForgotPassword";
  return (
    <div className=" flex justify-center ">
      <AppRoutes />
      {!isHomePage && !isCadastroPage && !isForgotPasswordPage && (
        <>
          <BarraMenu />
          <TopMenu />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <GlobalProvider>
      <ExerciciosProvider>
        <Router>
          <Layout />
        </Router>
      </ExerciciosProvider>
    </GlobalProvider>
  );
}
export default App;
