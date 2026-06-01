import "./IniciarSesionPage.css";
import React, { useState } from "react";
import Inputweb from "../../Components/Inputweb/Inputweb.jsx";
import Boton from "../../Components/Boton/Boton.jsx";
import Iconoavatar from "../../Components/Iconoavatar/Iconoavatar.jsx";
import { useNavigate } from "react-router-dom";
import { db } from "../../FireBase/config.js";
import Swal from "sweetalert2";
import Check from "../../Components/Check/Check.jsx";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const IniciarSesionPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [ver, setVer] = useState(false);

  const iniciarSesion = async () => {
    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Los campos Email y Contraseña son requeridos.",
      });
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Sesión iniciada correctamente.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => navigate("/Home"));
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El correo o la contraseña son incorrectos.",
          });
          break;
        case "auth/invalid-email":
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El email no es válido.",
          });
          break;
        case "auth/too-many-requests":
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Demasiados intentos fallidos. Intenta más tarde.",
          });
          break;
        default:
          console.error("Error Firebase:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error inesperado.",
          });
      }
    }
  };

  const iniciarSesionGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const userAuth = result.user;

      const docRef = doc(db, "Usuarios", userAuth.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          nombre: userAuth.displayName,
          correo: userAuth.email,
          rol: false,
          uid: userAuth.uid,
        });
      }

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Sesión iniciada correctamente.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => navigate("/Home"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="IniciarSesionPage">
      <div className="IniciarSesionForm">
        <Iconoavatar className="IconoU"></Iconoavatar>
        <h1 className="tituloIniciarSesion">Iniciar Sesión</h1>
        <p className="subtituloIniciarSesion">
          Bienvenido - Digite sus Datos de Usuario
        </p>

        <Inputweb id="email-login" value="Email" setValue={setEmail} />
        <div className="inputConContrasena">
          <Inputweb
            id="password-login"
            value="Contraseña"
            setValue={setPassword}
            type={ver ? "text" : "password"}
          />
          <div className="checkContainer">
            <Check setVer={setVer}></Check>
          </div>
        </div>
        <div className="botonesContainer">
          <Boton
            className="botonIniciarSesion"
            value="Iniciar Sesión"
            funcion={iniciarSesion}
          />
          <Boton
            className="botonRegistrar"
            value="Registrarse"
            funcion={() => navigate("/Registrar")}
          />
          <Boton value="Iniciar con Google" funcion={iniciarSesionGoogle} />
        </div>
      </div>
    </main>
  );
};

export default IniciarSesionPage;
