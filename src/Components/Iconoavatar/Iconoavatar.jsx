import React from "react";
import Avatar from "@mui/material/Avatar";
import "./Iconoavatar.css";
const Iconoavatar = ({ img, funcion }) => {
  return (
    <div className="IconoAvatarContainer">
      <Avatar
        alt="Usuario"
        src={img}
        onClick={funcion || undefined}
        style={{ cursor: funcion ? "pointer" : "default" }}
      />
    </div>
  );
};

export default Iconoavatar;
