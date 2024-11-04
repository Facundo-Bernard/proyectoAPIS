import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FOOTER from '../PAGINAPRINCIPAL/FOOTER';
import BANNER from './BANNERLOGIN/BANNER';
import "./LOGIN.css";

function LOGIN({ loginButtonRef }) {
  // Variables locales para manejar el estado de login y registro
  const [username, setUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [userType, setUserType] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Manejadores para actualizar el estado
  const handleLoginUsernameChange = (e) => setUsername(e.target.value);
  const handleLoginPasswordChange = (e) => setLoginPassword(e.target.value);
  const handleRegisterNameChange = (e) => setName(e.target.value);
  const handleRegisterEmailChange = (e) => setEmail(e.target.value);
  const handleRegisterPasswordChange = (e) => setRegisterPassword(e.target.value);
  const handleUserTypeChange = (e) => setUserType(parseInt(e.target.value));

  // Función para crear un usuario y guardarlo en la base de datos
  const crearUsuario = async () => {
    await fetch("http://localhost:8080/usuario/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: registerPassword,
        tipoUsuario: userType
      }),
    });
  };

  // Función para iniciar sesión
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/usuario");
      const usuarios = await response.json();

      const user = usuarios.find((u) => u.name === username && u.password === loginPassword);

      if (user) {
        // Almacena los detalles del usuario en el estado global con Redux
        dispatch({
          type: 'LOGIN',
          payload: {
            name: user.name,
            tipoUsuario: user.tipoUsuario,
            id:user.id
          }
        });

        // Redirige a la página principal después del login exitoso
        navigate('/pagina-principal');
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <BANNER />
      <section className="container my-5">
        <div className="row">
          {/* Sección de información */}
          <div className="col-md-6">
            <div className="blurred-section">
              <h2>¿Qué es Mayores Actualizaciones?</h2>
              <p>
                Mayores Actualizaciones es un servicio orientado a ayudar a gente mayor a manejarse mejor en el mundo digital, un mundo que cada vez avanza más en esta dirección.
              </p>
              <p>
                Aquí puedes encontrar cursos para ayudarte a aprender a usar diversas tecnologías y a existir en un mundo digital.
              </p>
            </div>
          </div>

          {/* Formularios de Login y Registro */}
          <div className="col-md-6">
            <div className="row">
              {/* Formulario de Login */}
              <div className="col-md-6">
                <h2>Login</h2>
                <form>
                  <div className="form-group mb-3">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={handleLoginUsernameChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Contraseña:</label>
                    <input
                      type="password"
                      className="form-control"
                      value={loginPassword}
                      onChange={handleLoginPasswordChange}
                    />
                  </div>
                  {/* Botón de Login con referencia */}
                  <button
                    type="button"
                    ref={loginButtonRef}
                    className="btn btn-primary btn-block"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </form>
              </div>

              {/* Formulario de Registro */}
              <div className="col-md-6">
                <h2>Registro</h2>
                <form>
                  <div className="form-group mb-3">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={handleRegisterNameChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={handleRegisterEmailChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Contraseña:</label>
                    <input
                      type="password"
                      className="form-control"
                      value={registerPassword}
                      onChange={handleRegisterPasswordChange}
                    />
                  </div>
                  <button type="button" className="btn btn-success btn-block" onClick={crearUsuario}>
                    Registrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FOOTER />
    </div>
  );
}

export default LOGIN;
