// import React from 'react'
import { useState } from "react";
import PropTypes from "prop-types";
import "../Styles/Formulario.css";
import Input from "./Input";

const Formulario = ({ estadoFormulario, setEstadoFormulario, estadoMetodo, setEstadoMetodo, orderID, cantidad }) => {
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

  const validarEnvio = (event) => {
    event.preventDefault();
    if (nombreValido && apellidoValido && ciudadValido && emailValido && numeroValido) {
      setEstadoMetodo(!estadoMetodo);
      handleSubmit();
    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  };
  

  const handleSubmit = async () => {
    try{
      let config = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: nombre,
          lastName: apellido,
          phoneNumber: numero,
          city: ciudad,
          email: email,
          orderId: orderID,
          quantity: cantidad
        })
      }
      
      await fetch("https://sticky-api-ten.vercel.app/api/people", config)
      // let res = await fetch("https://sticky-api-ten.vercel.app/api/people", config)
      // let json = await res.json();
      // console.log(json)

    }catch(error){
      console.error(error)
    }
  }

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
  estadoMetodo: PropTypes.bool.isRequired,
  setEstadoMetodo: PropTypes.func.isRequired,
  orderID: PropTypes.string.isRequired
};

export default Formulario;
