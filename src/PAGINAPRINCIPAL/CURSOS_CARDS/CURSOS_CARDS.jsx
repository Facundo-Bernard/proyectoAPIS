    import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import imagencurso2 from "../../assets/mayorcelular.jpg";
import imagencurso1 from "../../assets/tramites-dgt-mayores-65.jpg";
import './CURSOS_CARDS.css';
import CursoCard from './CURSO_CARD';

    function CURSOS_CARDS() {

        const user = useSelector(state => state.user);
        const progreso = useSelector(state => state.progreso);

        const [progresoCurso1, setprogresoCurso1] = useState(0)
        const [progresoCurso2, setprogresoCurso2] = useState(0)
        const [progresoCurso3, setprogresoCurso3] = useState(0)

        useEffect(() => {

            console.log("este es tu id: "+ user.id)
            
            const fetchProgreso = async () => {
                console.log(user);
                try {
                    // Verificar si existe un ID de usuario
                    if (!user || !user.id) {
                        console.error("Usuario no definido o sin ID");
                        return;
                    }
            
                    console.log("Realizando la solicitud...");
                    
                    const response = await fetch(`http://localhost:8080/progreso/obtenerUsuario/${user.id}`);
                    
                    // Imprimir el código de estado
                    console.log("Response status: ", response.status);
            
                    // Verificar si la respuesta es correcta
                    if (!response.ok) throw new Error("Error en la respuesta del servidor");
            
                    const data = await response.json();
                    console.log("Respuesta del servidor: ", data); // Verifica el cuerpo de la respuesta
                    console.log(data[0].cursoId+ "asi se ve usando indice")

                    data.forEach(item => {
                        switch (item.cursoId) {
                            case 3:
                                setprogresoCurso3(item.progreso);
                                break;
                            case 2:
                                setprogresoCurso2(item.progreso);
                                break;
                            case 1:
                                setprogresoCurso1(item.progreso);
                                break;
                            default:
                                // Puedes manejar el caso en que cursoId no sea 1, 2 o 3, si es necesario
                                break;
                        }
                    });
                    
                    // Asegúrate de que estás accediendo a la propiedad correcta
                    dispatch({
                        type: "LOAD_PROGRESS",
                        payload: data // o data.content, según sea necesario
                    });
            
                } catch (error) {
                    console.error("Error al obtener progreso: ", error);
                }
            };

            fetchProgreso();
        }, [user])

    const crearProgreso = async (cursoId) => {
        try {
            const response = await fetch('http://localhost:8080/progreso/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    cursoId,
                    progreso: 0,
                }),
            });

            if (!response.ok) throw new Error("Error al crear progreso");

            const data = await response.json();
            console.log("Progreso creado:", data);

            dispatch({
                type: "ADD_PROGRESO",
                payload: data,
            });
        } catch (error) {
            console.error("Error al crear progreso:", error);
        }
    };

        const actualizarProgreso = async (cursoId, nuevoProgreso) => {
            try {
                const response = await fetch('http://localhost:8080/progreso/actualizar', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user.id,
                        cursoId,
                        progreso: nuevoProgreso,
                    }),
                });
    
                if (!response.ok) throw new Error("Error al actualizar progreso");
    
                const data = await response.json();
                console.log("Progreso actualizado:", data);
    
                dispatch({
                    type: "UPDATE_PROGRESO",
                    payload: { cursoId, progreso: nuevoProgreso },
                });
            } catch (error) {
                console.error("Error al actualizar progreso:", error);
            }
        };
   
        const cursos = [
            {
                title: 'Manejo de tramites digitales',
                company: 'Mayores Actualizaciones',
                applied: progresoCurso1,
                capacity: 10,
                daysAgo: 1,
                category: 'Tramites',
                image: imagencurso1,
                hoverText: 'Un curso importante donde se vera como hacer y rellenar tramites en diversas paginas de comunes, como funcionan, que datos poner y otra informacion importante para poder manejarte mejor con el mundo digital!!!'
            },
            {
                title: 'Uso de general de celular',
                company: 'Mayores Actualizaciones',
                applied: progresoCurso2,
                capacity: 6,
                daysAgo: 4,
                category: 'dispositivos',
                image: imagencurso2,
                hoverText:"Un curso general que te enseñara todas las habilidades basicas para usar un celular. desde prender, apagar, como llamar y que significan las distintas funciones generales junto con buenas practicas y cuidados. Importante para todos aquellos que deseen mejorar en operar una de las herramientas mas importantes del mundo actual!!!"
            },
            {
                title: 'curso ejemplo',
                company: 'Mayores actualizaciones',
                applied: progresoCurso3,
                capacity: 10,
                daysAgo: 2,
                category: 'ejemplo',
                url: '/curso3'
            }
        ];



    return (
        <>
        <div class=" m-5 mb-3">
        <div class="row">
        <div className="row">
                {cursos.map((curso, index) => (
                    <CursoCard
                        key={index}
                        hoverText={curso.hoverText}
                        title={curso.title}
                        company={curso.company}
                        applied={curso.applied}
                        capacity={curso.capacity}
                        daysAgo={curso.daysAgo}
                        category={curso.category}
                        image={curso.image}
                        url={curso.url}
                    />
                ))}
            </div>

            
        </div>
    </div>
        </>
    );
    }
    export default CURSOS_CARDS;
