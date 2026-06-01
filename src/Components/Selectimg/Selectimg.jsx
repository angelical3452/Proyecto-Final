import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Selectimg.css";

const Selectimg = ({ setArchivo }) => {
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setArchivo(reader.result);
    };
    reader.readAsDataURL(archivo);
  };

  return (
    <div className="Selectimg">
      <Button variant="contained" component="label">
        Subir imagen
        <input type="file" hidden accept="image/*" onChange={handleChange} />
      </Button>
      {preview && <img src={preview} alt="preview" />}
    </div>
  );
};

export default Selectimg;
