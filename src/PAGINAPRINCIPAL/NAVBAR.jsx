import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useSelector } from 'react-redux';
import logo from "../assets/logo.jpg";

function NAVBAR({ scrollToLogin }) {
  // Selecciona el usuario logueado desde el store de Redux
  const user = useSelector(state => state.user);

  const handleCursosClick = () => {
    if (scrollToLogin && scrollToLogin.current) {
      // Realiza scroll hasta el botón de login si el ref existe
      scrollToLogin.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img height="130" src={logo} alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleCursosClick}>Cursos</a>
            </li>
            {user?.name ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Bienvenido {user.name} !!</span>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Salir</a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="#">Iniciar sesión</a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NAVBAR;

