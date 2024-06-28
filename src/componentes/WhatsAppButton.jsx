import "../Styles/WhatsAppButton.css";

const WhatsAppButton = () => {
  return (
    <>
        <a href="https://api.whatsapp.com/send?phone=573186347131&text=%C2%A1Hola!%20Me%20encantar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20mis%20tickets." className="btn-wsp" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-whatsapp icono"></i>
        </a>
    </>
  );
};

export default WhatsAppButton;