import React, { useState } from "react";
import Button from "@mui/material/Button";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import "./Geolocalizacion.css";
const Geolocalizacion = ({ setCoordenadas }) => {
  const [ubicacion, setUbicacion] = useState("");
  const [cargando, setCargando] = useState(false);

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    setCargando(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordenadas(coords);
        setUbicacion(`${coords.lat}, ${coords.lng}`);
        setCargando(false);
      },
      (error) => {
        alert("No se pudo obtener la ubicación");
        setCargando(false);
      },
    );
  };

  return (
    <div className="Geolocalizacion">
      {ubicacion && <p>📍 {ubicacion}</p>}
      <Button
        variant="contained"
        startIcon={<MyLocationIcon />}
        onClick={obtenerUbicacion}
        disabled={cargando}
      >
        {cargando ? "Obteniendo ubicación..." : "Usar mi ubicación"}
      </Button>
    </div>
  );
};

export default Geolocalizacion;
