import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const Check = ({ setVer }) => {
  return (
    <FormControlLabel
      control={<Checkbox onChange={(e) => setVer(e.target.checked)} />}
      label="Mostrar contraseña"
    />
  );
};

export default Check;
