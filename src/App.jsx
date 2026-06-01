import "./App.css";
import React from "react";
import IniciarSesionPage from "./Pages/IniciarSesionPage/IniciarSesionPage";
import RegistrarSesionPage from "./Pages/RegistrarSesionPage/RegistrarSesionPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import RutaProtegida from "./Components/RutaProtegida/RutaProtegida";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IniciarSesionPage />}></Route>
          <Route path="/Registrar" element={<RegistrarSesionPage />}></Route>
          <Route path="/Home/*" element={<RutaProtegida><Home /> </RutaProtegida>}>          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
