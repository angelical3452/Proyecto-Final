import React from "react";
import Button from "@mui/material/Button";

const Boton = ({ value,funcion , className }) => {


  return (
    <div className="contenedorBoton">

      <Button
        className={className}
        variant="contained"
        onClick={funcion}
      >
        {value}
      </Button>

    </div>
  );
};

export default Boton;