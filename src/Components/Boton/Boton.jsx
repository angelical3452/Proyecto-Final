import React from "react";
import Button from "@mui/material/Button";

const Boton = ({ value, funcion, className, disabled }) => {
  return (
    <button className={className} onClick={funcion} disabled={disabled}>
      {value}
    </button>
  );
};

export default Boton;
