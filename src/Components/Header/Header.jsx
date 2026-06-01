import React, { useState, useEffect } from "react";
import "./Header.css";
import Iconoavatar from "../Iconoavatar/Iconoavatar";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../FireBase/config.js";
const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (!userAuth) return;

      const docSnap = await getDoc(doc(db, "Usuarios", userAuth.uid));
      if (docSnap.exists()) {
        setUsuario(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="HEADER">
      <h1 className="HEADERTEXTO">Deteccion De Daños Infraestructurales</h1>
      <div style={{ position: "relative" }}>
        <Iconoavatar funcion={() => setMenuAbierto((prev) => !prev)} />
        {menuAbierto && (
          <div className="MenuAvatar">
            <div className="MenuAvatarInfo">
              <p className="MenuAvatarNombre">
                {usuario?.nombre} <br />
              </p>
              <p className="MenuAvatarRol">
                {usuario?.rol ? "Administrador" : "Usuario"}
              </p>
            </div>
            <hr />
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
