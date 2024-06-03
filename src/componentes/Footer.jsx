// import React from 'react'
import "../Styles/Footer.css";
import icono from "../imagenes/icono.png";

const Footer = () => {
  return (
    <div className="main-footer">
  <div className="footer-middle">
    <div className="container d-flex justify-content-between">
      <div className="footerText">
        <h2>Contactanos</h2>
        <p>Norte de Santander, Colombia</p>
        <p>Colombia</p>
        <p>betttime09@gmail.com</p>
        <p className="text-xs-center mb-5 my-4">
          ©{new Date().getFullYear()} Sticky by BetTime - All Rights
          Reserved
        </p>
      </div>
      <div className="contenedorLogo">
        <img className="logoFooter" src={icono}></img>
      </div>
    </div>
    <div className="footer-bottom"></div>
  </div>
</div>

  );
};

export default Footer;
