import { useState } from "react";
import "../Styles/Input.css";
import PropTypes from "prop-types";
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

function Input({ tipo, dato, setFormValid, setValue }) {
  const [focused, setFocused] = useState(false);
  const [validationPassed, setValidationPassed] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const manejarInput = (valor, tipo) => {
    if (valor === inputValue) {
      return;
    }
    if (tipo === "text" && /\d/.test(valor)) {
      return;
    }
    setInputValue(valor);
    if (valor.trim() !== "") {
      let esValido = false;
      switch (tipo) {
        case "text":
          esValido = /^[a-zA-Z\s]*$/.test(valor) && valor.trim().length >= 3;
          break;
        case "number":
          esValido = /^\d{10,}$/.test(valor);
          break;
        case "email":
          esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
          break;
        default:
          esValido = true;
      }
      setValidationPassed(esValido);
      setFormValid(esValido);
      if (esValido) {
        setValue(valor);
      }
    }
  };

  return (
    <div className="contenedor-input">
      <label htmlFor={`${tipo}-${dato}`}>{dato}</label>
      <input
        className={`input ${validationPassed ? "correcto" : "incorrecto"}`}
        id={`${tipo}-${dato}`}
        type={tipo}
        value={inputValue}
        onChange={(e) => manejarInput(e.target.value, tipo)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
        required
        placeholder={`Digite su ${dato.toLowerCase()}...`}
      />
      {focused === true ? (
        validationPassed ? (
          <BsCheckCircleFill className="iconoMostrar correcto" />
        ) : (
          <BsFillXCircleFill className="iconoMostrar incorrecto" />
        )
      ) : null}
    </div>
  );
}
Input.propTypes = {
  tipo: PropTypes.string.isRequired,
  dato: PropTypes.string.isRequired,
  setFormValid: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Input;
