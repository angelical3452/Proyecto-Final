import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Nav from "../../Components/Nav/Nav";
import "./Home.css";
import React from "react";
import InicioPage from "../InicioPage/InicioPage";
import RegistrarincidentePage from "../RegistrarincidentePage/RegistrarincidentePage";
import IncidentesPage from "../IncidentesPage/IncidentesPage";
import EstadisticaPage from "../EstadisticaPage/EstadisticaPage";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route index element={<InicioPage />} />
        <Route
          path="RegistrarincidentePage"
          element={<RegistrarincidentePage />}
        />
        <Route path="IncidentesPage" element={<IncidentesPage />} />
        <Route path="Estadistica" element={<EstadisticaPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Home;
