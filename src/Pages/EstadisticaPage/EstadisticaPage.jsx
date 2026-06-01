import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../FireBase/config.js";
import "./EstadisticaPage.css";

const EstadisticaPage = () => {
  const [incidentes, setIncidentes] = useState([]);
  const [periodo, setPeriodo] = useState("todo");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Incidentes"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setIncidentes(lista);
    });
    return () => unsubscribe();
  }, []);

  const ahora = new Date();

  const filtrarPorPeriodo = (lista) => {
    if (periodo === "todo") return lista;
    return lista.filter((i) => {
      if (!i.fecha) return false;
      const [fechaParte] = i.fecha.split(" ");
      const [dia, mes, anio] = fechaParte.split("/");
      const fecha = new Date(`${anio}-${mes}-${dia}`);
      const diff = (ahora - fecha) / (1000 * 60 * 60 * 24);
      if (periodo === "semana") return diff <= 7;
      if (periodo === "mes") return diff <= 30;
      if (periodo === "anio") return diff <= 365;
      return true;
    });
  };

  const datos = filtrarPorPeriodo(incidentes);
  const total = datos.length;

  const porEstado = datos.reduce((acc, i) => {
    acc[i.estado] = (acc[i.estado] || 0) + 1;
    return acc;
  }, {});

  const porTipo = datos.reduce((acc, i) => {
    acc[i.tipo] = (acc[i.tipo] || 0) + 1;
    return acc;
  }, {});

  const imprimir = () => window.print();

  return (
    <div className="EstadisticasPage">
      <div className="EstadisticasHeader no-print">
        <h2>Estadísticas</h2>
        <div className="PeriodoFiltros">
          {[
            { value: "semana", label: "Última semana" },
            { value: "mes", label: "Último mes" },
            { value: "anio", label: "Último año" },
            { value: "todo", label: "Todo" },
          ].map((p) => (
            <button
              key={p.value}
              className={`FiltroChip ${periodo === p.value ? "activo" : ""}`}
              onClick={() => setPeriodo(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button className="BotonImprimir" onClick={imprimir}>
          🖨️ Imprimir
        </button>
      </div>

      <div className="EstadisticasContenido">
        {/* Total */}
        <div className="StatCard">
          <p className="StatLabel">Total de incidentes</p>
          <p className="StatNumero">{total}</p>
        </div>

        {/* Por estado */}
        <div className="StatSeccion">
          <h3>Por estado</h3>
          <div className="StatGrid">
            {Object.entries(porEstado).map(([estado, count]) => (
              <div key={estado} className="StatCard">
                <p className="StatLabel">{estado}</p>
                <p className="StatNumero">{count}</p>
                <div className="StatBarra">
                  <div
                    className="StatBarraRelleno"
                    style={{ width: `${Math.round((count / total) * 100)}%` }}
                  />
                </div>
                <p className="StatPorcentaje">
                  {Math.round((count / total) * 100)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Por tipo */}
        <div className="StatSeccion">
          <h3>Por tipo</h3>
          <div className="StatGrid">
            {Object.entries(porTipo).map(([tipo, count]) => (
              <div key={tipo} className="StatCard">
                <p className="StatLabel">{tipo}</p>
                <p className="StatNumero">{count}</p>
                <div className="StatBarra">
                  <div
                    className="StatBarraRelleno"
                    style={{ width: `${Math.round((count / total) * 100)}%` }}
                  />
                </div>
                <p className="StatPorcentaje">
                  {Math.round((count / total) * 100)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticaPage;
