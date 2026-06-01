import React, { useState } from "react";
import "./RegistrarincidentePage.css";
import Fechahora from "../../Components/Fechahora/Fechahora";
import AutocompleteIncidente from "../../Components/AutocompleteIncidente/AutocompleteIncidente";
import Textarea from "../../Components/Textarea/Textarea";
import Selectimg from "../../Components/Selectimg/Selectimg";
import Boton from "../../Components/Boton/Boton";
import Geolocalizacion from "../../Components/Geolocalizacion/Geolocalizacion";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../FireBase/config.js";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const RegistrarincidentePage = () => {
  const [fecha, setFecha] = useState("");
  const [incidente, setIncidente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [coordenadas, setCoordenadas] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [reset, setReset] = useState(0);

  const limpiar = () => {
    setFecha("");
    setIncidente("");
    setDescripcion("");
    setImagen("");
    setCoordenadas("");
    setUbicacion("");
    setReset((prev) => prev + 1);
  };

  const registrarIncidente = async () => {
    if (!incidente.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Selecciona o escribe el tipo de incidente.",
      });
      return;
    }
    if (!descripcion.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Escribe una descripción del incidente.",
      });
      return;
    }
    if (!ubicacion.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Escribe la ubicación del incidente.",
      });
      return;
    }
    if (!imagen) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "La fotografía es obligatoria.",
      });
      return;
    }
    if (!coordenadas?.lat || !coordenadas?.lng) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "La ubicación GPS es obligatoria.",
      });
      return;
    }

    try {
      const auth = getAuth();
      const uid_usuario = auth.currentUser.uid;

      await addDoc(collection(db, "Incidentes"), {
        tipo: incidente,
        descripcion: descripcion,
        fotografia: imagen,
        ubicacion: {
          lugar: ubicacion,
          lat: coordenadas?.lat,
          lng: coordenadas?.lng,
        },
        fecha: fecha,
        estado: "Reportado",
        uid_usuario: uid_usuario,
      });

      limpiar();

      Swal.fire({
        icon: "success",
        title: "¡Incidente registrado!",
        text: "El incidente ha sido reportado correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al registrar incidente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al registrar el incidente.",
      });
    }
  };

  return (
    <div className="RegistrarincidentePage" key={reset}>
      <div className="RegistrarincidenteContainer">
        <Fechahora setFecha={setFecha} />
        <AutocompleteIncidente setIncidente={setIncidente} />
        <Textarea
          setDescripcion={setDescripcion}
          value="Descripción del incidente"
        />
        <Textarea
          setDescripcion={setUbicacion}
          value="Ubicación del incidente"
        />
        <Selectimg setArchivo={setImagen} />
        <Geolocalizacion setCoordenadas={setCoordenadas} />
        <Boton value="Registrar incidente" funcion={registrarIncidente} />
      </div>
    </div>
  );
};

export default RegistrarincidentePage;
