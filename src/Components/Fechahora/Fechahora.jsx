import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./Fechahora.css";
const Fechahora = ({ setFecha }) => {
  const [ahora, setAhora] = useState(dayjs().format("DD/MM/YYYY HH:mm"));

  useEffect(() => {
    const intervalo = setInterval(() => {
      const nueva = dayjs().format("DD/MM/YYYY HH:mm");
      setAhora(nueva);
      setFecha(nueva);
    }, 1000);
    
    return () => clearInterval(intervalo);
  }, [setFecha]);

  return (
    <div className="Fechahora">
      <p>{ahora}</p>
    </div>
  );
};

export default Fechahora;
