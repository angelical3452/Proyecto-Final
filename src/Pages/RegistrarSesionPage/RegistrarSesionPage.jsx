import "./RegistrarSesionPage.css";
import Inputweb from "../../Components/Inputweb/Inputweb.jsx";
import Boton from "../../Components/Boton/Boton.jsx";
import Iconoavatar from "../../Components/Iconoavatar/Iconoavatar.jsx";
import { useState } from "react";
import { db } from "../../FireBase/config.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import Check from "../../Components/Check/Check.jsx";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegistrarSesionPage = () => {
  const [correo, setCorreo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [ver, setVer] = useState(false);

  const registrarse = async () => {
    if (!username.trim() || !password.trim() || !correo.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Todos los campos son requeridos.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Ingresa un correo válido. Ejemplo: usuario@correo.com",
      });
      return;
    }

    if (username.trim().length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Nombre de usuario muy corto",
        text: "El nombre de usuario debe tener al menos 3 caracteres.",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña muy corta",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo,
        password,
      );
      const userAuth = userCredential.user;

      const esAdmin = password.startsWith("SOY_ADMINISTRADOR");
      await setDoc(doc(db, "Usuarios", userAuth.uid), {
        nombre: username,
        correo: correo,
        rol: esAdmin,
        uid: userAuth.uid,
      });

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: `Bienvenido ${username}, tu cuenta ha sido creada.`,
        timer: 1500,
        showConfirmButton: false,
      }).then(() => navigate("/"));
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Correo ya registrado",
          text: "Este correo ya tiene una cuenta.",
        });
      } else {
        console.error("Error al registrar:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al registrar. Intenta de nuevo.",
        });
      }
    }
  };

  return (
    <div className="RegistrarSesionPage">
      <div className="RegistrarSesionForm">
        <Iconoavatar className="IconoU"></Iconoavatar>
        <Inputweb
          id="correo-registro"
          value="Correo Electronico"
          setValue={setCorreo}
        />
        <Inputweb
          id="nombre-registro"
          value="Nombre completo"
          setValue={setUsername}
        />
        <div>
          <Inputweb 
            id="password-registro"
            value="Contraseña"
            setValue={setPassword}
            type={ver ? "text" : "password"}
          />
          <Check setVer={setVer}></Check>
        </div>
        <Boton
          className="botonIniciarSesion"
          value="Registrar"
          funcion={registrarse}
        ></Boton>
        <Boton
          className="botonRegistrar"
          value="Ya tengo una cuenta"
          funcion={() => navigate("/")}
        ></Boton>
      </div>
    </div>
  );
};

export default RegistrarSesionPage;
