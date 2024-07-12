// import React from 'react'
import { useState } from "react";
import PropTypes from "prop-types";
import "../Styles/Formulario.css";
import Input from "./Input";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PROJECT_URL;
const supabaseKey = process.env.API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Formulario = ({
  estadoFormulario,
  setEstadoFormulario,
  numerosSeleccionados,
  setNumerosSeleccionados,
  reinicio,
  setReinicio
}) => {
  const [nombreValido, setNombreValido] = useState(false);
  const [apellidoValido, setApellidoValido] = useState(false);
  const [emailValido, setEmailValido] = useState(false);
  const [numeroValido, setNumeroValido] = useState(false);
  const [ciudadValido, setCiudadValido] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [ciudad, setCiudad] = useState("");

  const handleButtonClick = () => {
    const baseUrl = "https://api.whatsapp.com/send";
    const phone = "573186347131";
    const message = `¡Hola! Mi nombre es *${nombre}* me gustaría comprar estos *${numerosSeleccionados.length}* números para el sorteo de la moto Suzuki AX4: *${numerosSeleccionados.join(", ")}*.\n\nMedios de pago:\n\nNequi: *3003051903*\nBancolombia: *83229113545*\nDaviPlata: *3184825383*`;

    const url = `${baseUrl}?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const validarEnvio = (event) => {
    event.preventDefault();
    if (
      nombreValido &&
      apellidoValido &&
      ciudadValido &&
      emailValido &&
      numeroValido
    ) {
      handleSubmit();
      setEstadoFormulario(false);
      setNumerosSeleccionados([]);
      setReinicio(!reinicio)
    } else {
      alert("Por favor, complete todos los campos correctamente.");
      setFormularioValido(false);
    }
  };
  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("PeopleRecords").insert([
        {
          name: nombre,
          lastname: apellido,
          phonenumber: numero,
          city: ciudad,
          email: email,
          quantity: numerosSeleccionados.length,
          tickets: numerosSeleccionados,
          transactionstatus: "pending",
        },
      ]);

      if (error) {
        throw error;
      }
      // console.log("Registro insertado con éxito");
    } catch (error) {
      // console.error("Error al insertar el registro:", error.message);
    }
  };

  return (
    <>
      {estadoFormulario && (
        <div className="overlay">
          <div className="contenedorModal">
            <button
              className="botonCerrar"
              onClick={() => setEstadoFormulario(false)}
            >
              <i className="fas fa-times fw-bold"></i>
            </button>
            <h1 className="titulo-formato text-center text-primary my-4">
              Factura
            </h1>
            <form onSubmit={validarEnvio}>
              <Input
                tipo="text"
                dato="Primer Nombre"
                setFormValid={setNombreValido}
                setValue={setNombre}
              />
              <Input
                tipo="text"
                dato="Primer Apellido"
                setFormValid={setApellidoValido}
                setValue={setApellido}
              />
              <Input
                tipo="number"
                dato="Numero Telefonico"
                setFormValid={setNumeroValido}
                setValue={setNumero}
              />
              <Input
                tipo="text"
                dato="Ciudad"
                setFormValid={setCiudadValido}
                setValue={setCiudad}
              />
              <Input
                tipo="email"
                dato="Email"
                setFormValid={setEmailValido}
                setValue={setEmail}
              />
              <div className="pop d-flex justify-content-center align-items-center">
                <button
                  className="cancelar"
                  onClick={() => setEstadoFormulario(false)}
                >
                  Cancelar
                </button>
                <button
                  className="pagar"
                  type="submit"
                  onClick={handleButtonClick}
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
Formulario.propTypes = {
  estadoFormulario: PropTypes.bool.isRequired,
  setEstadoFormulario: PropTypes.func.isRequired,
  // estadoMetodo: PropTypes.bool.isRequired,
  // setEstadoMetodo: PropTypes.func.isRequired,
};

export default Formulario;
