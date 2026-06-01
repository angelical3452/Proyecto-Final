import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SelectState from "../SelectState/SelectState.jsx";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../FireBase/config.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import "./CardIncidente.css";

const CardIncidente = ({
  imagen,
  Incidente,
  descripcion,
  ubicacion,
  coordenadas,
  estado,
  fechacreacion,
  idreporte,
  idusuario,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nuevoEstado, setNuevoEstado] = useState(estado);
  const [esAdmin, setEsAdmin] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (!userAuth) return;
      const docSnap = await getDoc(doc(db, "Usuarios", userAuth.uid));
      if (docSnap.exists()) setEsAdmin(docSnap.data().rol);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const obtenerNombre = async () => {
      if (!idusuario) return;
      const docSnap = await getDoc(doc(db, "Usuarios", idusuario));
      if (docSnap.exists()) {
        setNombreUsuario(docSnap.data().nombre);
      }
    };
    obtenerNombre();
  }, [idusuario]);

  useEffect(() => {
    setNuevoEstado(estado);
  }, [estado]);

  const cambiarEstado = async (nuevoValor) => {
    try {
      await updateDoc(doc(db, "Incidentes", idreporte), { estado: nuevoValor });
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el estado.",
      });
    }
  };

  return (
    <div>
      <Card className="ReporteCard" sx={{ maxWidth: 345 }} onClick={handleOpen}>
        <CardActionArea>
          <CardMedia
            className="ReporteCardImagen"
            component="img"
            height="140"
            image={imagen}
            alt={Incidente}
          />

          <CardContent className="ReporteCardBody">
            <div className="ReporteCardHeader">
              <Typography
                className="ReporteCardTitulo"
                gutterBottom
                variant="h5"
                component="div"
              >
                {Incidente}
              </Typography>
            </div>

            <div style={{ color: "text.secondary", fontSize: 14 }}>
              {esAdmin ? (
                <Box onClick={(e) => e.stopPropagation()}>
                  <SelectState
                    estado={nuevoEstado}
                    setEstado={(valor) => {
                      setNuevoEstado(valor);
                      cambiarEstado(valor);
                    }}
                  />
                </Box>
              ) : (
                <span>{estado}</span>
              )}
              <span> - {fechacreacion}</span>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="ModalBox">
          <div className="ModalImagenWrapper">
            <img className="ModalImagen" src={imagen} alt={Incidente} />
          </div>

          <div className="ModalContenido">
            <Typography id="modal-modal-title" className="ModalTitulo">
              {Incidente}
            </Typography>

            <Typography id="modal-modal-description" className="ModalInfoValor">
              {descripcion}
            </Typography>

            <div className="ModalInfoLista">
              <div className="ModalInfoFila">
                <span className="ModalInfoLabel">Fecha</span>
                <span className="ModalInfoValor">{fechacreacion}</span>
              </div>

              <div className="ModalInfoFila">
                <span className="ModalInfoLabel">Estado</span>
                <span className="ModalInfoValor">{estado}</span>
              </div>

              <div className="ModalInfoFila">
                <span className="ModalInfoLabel">Ubicación</span>
                <span className="ModalInfoValor">{ubicacion}</span>
              </div>

              <div className="ModalInfoFila">
                <span className="ModalInfoLabel">Coordenadas</span>
                <span className="ModalInfoValor">{coordenadas}</span>
              </div>

              <div className="ModalInfoFila">
                <span className="ModalInfoLabel">Reportado por</span>
                <span className="ModalInfoValor">{nombreUsuario}</span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardIncidente;
