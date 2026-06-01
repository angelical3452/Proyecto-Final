import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="nav">
      <NavLink to="/Home" end> Inicio</NavLink>
      <NavLink to="/Home/RegistrarincidentePage"> Registrar incidente</NavLink>
      <NavLink to="/Home/IncidentesPage"> Incidentes</NavLink>
      <NavLink to="/Home/Estadistica"> Estadistica </NavLink>
    </nav>
  );
};

export default Nav;
