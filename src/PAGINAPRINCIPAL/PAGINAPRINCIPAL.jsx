import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useSelector } from 'react-redux';
import BANNER from "./BANNER/BANNER";
import CURSOS_CARDS from "./CURSOS_CARDS/CURSOS_CARDS";
import FOOTER from './FOOTER';
import NAVBAR from './NAVBAR';
function PAGINAPRINCIPAL() {
  const user = useSelector(state => state.user);

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <NAVBAR></NAVBAR>
      <BANNER></BANNER>
      <CURSOS_CARDS></CURSOS_CARDS>
      <FOOTER></FOOTER>

      

      
    </div>
  );
}

export default PAGINAPRINCIPAL;
