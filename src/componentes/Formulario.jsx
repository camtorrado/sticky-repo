// import React from 'react'
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Formulario.css';
import Input from './Input';

const Formulario = ({ estadoFormulario, setEstadoFormulario }) => {
  
  const [nombreValido, setNombreValido] = useState(false);
  const [apellidoValido, setApellidoValido] = useState(false);
    const [emailValido, setEmailValido] = useState(false);
    const [numeroValido, setNumeroValido] = useState(false);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
  
    const validarEnvio = (event) => {
      event.preventDefault();
      if (nombreValido && apellidoValido && emailValido && numeroValido) {
        console.log('-----Formulario Enviado-----')
        console.log(`Nombre: ${nombre}`);
        console.log(`Apellido: ${apellido}`);
        console.log(`Email: ${email}`);
        console.log(`Número: ${numero}`);
        console.log("----------------------------")
        alert("Formulario enviado");
      } else {
        alert("Por favor, complete todos los campos correctamente.");
        console.log(`Nombre: ${nombreValido}`);
        console.log(`Apellido: ${apellidoValido}`);
        console.log(`Número: ${numeroValido}`);
        console.log(`Email: ${emailValido}`);
      }
    };
  
  return (
    <>
    {estadoFormulario &&
    <div className="overlay">
      <div className="contenedorModal">
        <button className='botonCerrar' onClick={()=>setEstadoFormulario(false)} >
        <i className="fas fa-times fw-bold"></i>
        </button>
        <h1 className="titulo-formato text-center text-primary my-4">Factura</h1>
        <form onSubmit={validarEnvio}>
          <Input
            tipo="text"
            dato="Primer Nombre"
            setFormValid={setNombreValido}
            setValue = {setNombre}
          />
          <Input
            tipo="text"
            dato="Primer Apellido"
            setFormValid={setApellidoValido}
            setValue = {setApellido}
          />
          <Input
            tipo="number"
            dato="Numero Telefonico"
            setFormValid={setNumeroValido}
            setValue={setNumero}
          />
          <Input
            tipo="email"
            dato="Email"
            setFormValid={setEmailValido}
            setValue={setEmail}
          />
          <div className='pop d-flex justify-content-center align-items-center'>
            <button className='cancelar' onClick={()=>setEstadoFormulario(false)}>Cancelar</button>
            <button className='pagar' onSubmit={validarEnvio}>Pagar</button>
          </div>
          
        </form>
      </div>
    </div>}
    </>
  );
};
Formulario.propTypes = {
  estadoFormulario: PropTypes.bool.isRequired,
  setEstadoFormulario: PropTypes.func.isRequired,
};

export default Formulario;
