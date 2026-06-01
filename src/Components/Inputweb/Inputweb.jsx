import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Inputweb = ({ value, setValue, type, id }) => {
  return (
    <Box noValidate autoComplete="off">
      <TextField
        id={id || value.toLowerCase().replace(/\s/g, "-")}
        label={value}
        variant="outlined"
        type={type}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  );
};

export default Inputweb;
