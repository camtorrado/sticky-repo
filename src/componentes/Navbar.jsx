import "../Styles/Navbar.css";
import logo from "../imagenes/logo.png";

const Navbar = () => {
  return (
    <>
      <div>
        <nav className="navbar">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="" />
              <p className="name text-center">Sticky</p>
            </a>
            <div className="navbar-nav fw-bold">
              <a className="nav-link active" href="#contacto">
                Contacto
              </a>
              <a className="nav-link btn btn-dark" href="#stickers">
                Stickers
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
