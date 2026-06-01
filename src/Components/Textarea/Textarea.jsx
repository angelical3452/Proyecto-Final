import React from "react";
import TextField from "@mui/material/TextField";
import "./Textarea.css";
const Textarea = ({ value, setDescripcion }) => {
  return (
    <div className="Textarea">
      <TextField
        label={value}
        multiline
        rows={4}
        fullWidth
        onChange={(e) => setDescripcion(e.target.value)}
      />
    </div>
  );
};

export default Textarea;
