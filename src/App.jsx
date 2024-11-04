import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import CURSOEJEMPLO from './CURSOS/CURSOEJEMPLO/CURSOEJEMPLO.JSX';
import CURSOEJEMPLOP2 from './CURSOS/CURSOEJEMPLO/CURSOEJEMPLOP2.JSX';
import LOGIN from './LOGIN/LOGIN';
import PAGINAPRINCIPAL from './PAGINAPRINCIPAL/PAGINAPRINCIPAL';

function App() {
  const loginButtonRef = useRef(null);

  return (
    <>
      <Routes>
        {/* Aquí usas una función para renderizar el componente LOGIN y pasar loginButtonRef */}
        <Route path='/' element={<LOGIN loginButtonRef={loginButtonRef} />} />
        <Route path='/pagina-principal' element={<PAGINAPRINCIPAL />} />
        <Route path="/curso3" element={<CURSOEJEMPLO courseName="Curso Ejemplo" />} />
        <Route path="/curso3-2" element={<CURSOEJEMPLOP2/>}/>
      </Routes>
    </>
  );
}

export default App;
