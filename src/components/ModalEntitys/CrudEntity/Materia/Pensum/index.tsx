import React from 'react';

interface Materia {
  _id: string;
  nombre: string;
  requerimientos: string[];
  nivel: number;
}

const MapaConceptual: React.FC<{ materias: Materia[] }> = ({ materias }) => {
  const materiasDivs: JSX.Element[] = [];
  const lineasSvg: JSX.Element[] = [];
  const colorMap: { [key: string]: string } = {}; // Mapa de colores por materia

  // Agrupar las materias por nivel
  const materiasPorNivel: { [nivel: number]: Materia[] } = {};
  materias.forEach(materia => {
    if (!materiasPorNivel[materia.nivel]) {
      materiasPorNivel[materia.nivel] = [];
    }
    materiasPorNivel[materia.nivel].push(materia);
  });

  // Generar divs para representar las materias y labels de los semestres
  Object.keys(materiasPorNivel).forEach(nivel => {
    const nivelNum = parseInt(nivel);
    const materiasNivel = materiasPorNivel[nivelNum];

    // Agregar el label del semestre
    materiasDivs.push(
      <div
        key={`semestre-${nivelNum}`}
        style={{
          position: 'absolute',
          top: '10px',
          left: `${nivelNum * 200}px`,
          fontWeight: 'bold',
          zIndex: 2,
        }}
      >
        Semestre {nivelNum}
      </div>
    );

    materiasNivel.forEach((materia, index) => {
      materiasDivs.push(
        <div
          key={materia._id}
          style={{
            width: '110px',
            height: '60px',
            backgroundColor: 'lightblue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            border: '1px solid black',
            borderRadius: '5px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            top: `${index * 100 + 50}px`, // Espaciado entre materias en el mismo nivel
            left: `${nivelNum * 200}px`, // Espaciado entre niveles
            zIndex: 2, // Asegurar que las materias estén delante de las líneas
          }}
        >
          <p style={{fontSize: '10px', textAlign: 'center'}}>{materia.nombre}</p>
        </div>
      );
    });
  });

  // Generar SVG para representar las líneas de conexión
  materias.forEach(materia => {
    const connectedLines: JSX.Element[] = []; // Líneas conectadas a esta materia
    materia.requerimientos.forEach(requerimientoId => {
      const requerimiento = materias.find(m => m._id === requerimientoId);
      if (requerimiento) {
        const key = `${materia._id}-${requerimiento._id}`;
        if (!colorMap[key]) {
          colorMap[key] = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generar color si no existe
        }
        const color = colorMap[key]; // Usar color asignado

        const distancia = Math.abs(materia.nivel - requerimiento.nivel) * 200; // Distancia entre los semestres
        const posicionX1 = materia.nivel * 200 + 55; // Posición X de la primera materia
        const posicionY1 = materiasPorNivel[materia.nivel].indexOf(materia) * 100 + 80; // Posición Y de la primera materia
        const posicionX2 = requerimiento.nivel * 200 + 55; // Posición X de la segunda materia
        const posicionY2 = materiasPorNivel[requerimiento.nivel].indexOf(requerimiento) * 100 + 80; // Posición Y de la segunda materia

        connectedLines.push(
          <line
            key={`linea-${materia._id}-${requerimiento._id}`}
            x1={posicionX1}
            y1={posicionY1}
            x2={posicionX2}
            y2={posicionY2}
            style={{
              stroke: color, // Color de la línea (mismo color para todas las líneas conectadas a esta materia)
              strokeWidth: '2px', // Grosor de la línea
            }}
          />
        );
      }
    });

    // Agregar todas las líneas conectadas a esta materia al array principal de líneas
    lineasSvg.push(...connectedLines);
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {lineasSvg}
      </svg>
      {materiasDivs}
    </div>
  );
};

export default MapaConceptual;
