import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const SelectState = ({ estado, setEstado }) => {
  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            value={estado}
            label="Estado"
            onChange={(e) => setEstado(e.target.value)}
          >
            <MenuItem value="Reportado">Reportado</MenuItem>
            <MenuItem value="En proceso">En proceso</MenuItem>
            <MenuItem value="Resuelto">Resuelto</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectState;
