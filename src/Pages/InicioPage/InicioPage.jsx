import React from "react";
import "./InicioPage.css";

const InicioPage = () => {
  return (
    <div>
      <video className="VideoHome" autoPlay loop muted playsInline>
        <source src="./Videoamazon.mp4" type="video/mp4" />
      </video>
      <div className="ContenedorTexto">
        <h1 className="TituloHOME"> UNIREPORTA </h1>
        <p className="Descripcion">
          {" "}
          Sistema inteligente de gestión de incidentes universitarios. Reporta,
          consulta y da seguimiento en tiempo real.{" "}
        </p>
      </div>
    </div>
  );
};

export default InicioPage;
