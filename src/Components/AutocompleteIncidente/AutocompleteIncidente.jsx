import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./AutocompleteIncidente.css";
const opciones = ["Baño", "Electricidad", "Infraestructura", "Seguridad"];

const AutocompleteIncidente = ({ setIncidente }) => {
  return (
    <div className="AutocompleteIncidente">
      <Autocomplete
        freeSolo
        options={opciones}
        onChange={(e, valor) => setIncidente(valor)}
        onInputChange={(e, valor) => setIncidente(valor)}
        renderInput={(params) => (
          <TextField {...params} label="Tipo de incidente" />
        )}
      />
    </div>
  );
};

export default AutocompleteIncidente;
