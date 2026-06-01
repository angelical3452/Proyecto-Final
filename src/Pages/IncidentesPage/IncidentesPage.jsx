import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../FireBase/config.js";
import "./IncidentesPage.css";
import CardIncidente from "../../Components/CardIncidente/CardIncidente";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ITEMS_POR_PAGINA = 9;

const IncidentesPage = () => {
  const [incidentes, setIncidentes] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    const unsubscribe = onSnapshot(collection(db, "Incidentes"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIncidentes(lista);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setPagina(1);
  }, [filtro]);

  const incidentesFiltrados =
    filtro === "Todos"
      ? incidentes
      : incidentes.filter((i) => i.estado === filtro);

  const totalPaginas = Math.ceil(incidentesFiltrados.length / ITEMS_POR_PAGINA);

  const incidentesPaginados = incidentesFiltrados.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA,
  );

  return (
    <div className="AlmacenamientoPage">
      <div className="AlmacenamientoSubHeader">
        <h2>Incidentes</h2>
        <p>Total de Reportes: {incidentesFiltrados.length}</p>
        <div className="FiltrosContainer">
          {["Todos", "Reportado", "En proceso", "Resuelto"].map((f) => (
            <button
              key={f}
              className={`FiltroChip ${filtro === f ? "activo" : ""}`}
              onClick={() => setFiltro(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {cargando ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="ReportesLista">
            {incidentesPaginados.map((incidente) => (
              <CardIncidente
                key={incidente.id}
                imagen={incidente.fotografia}
                Incidente={incidente.tipo}
                descripcion={incidente.descripcion}
                estado={incidente.estado}
                fechacreacion={incidente.fecha}
                idusuario={incidente.uid_usuario}
                ubicacion={incidente.ubicacion?.lugar}
                coordenadas={
                  incidente.ubicacion?.lat + ", " + incidente.ubicacion?.lng
                }
                idreporte={incidente.id}
                idusuario={incidente.uid_usuario}
              />
            ))}
          </div>

          {totalPaginas > 1 && (
            <div className="PaginacionContainer">
              <Pagination
                count={totalPaginas}
                page={pagina}
                onChange={(e, nuevaPagina) => setPagina(nuevaPagina)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IncidentesPage;
