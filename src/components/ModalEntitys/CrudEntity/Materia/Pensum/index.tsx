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

  // Generar divs para representar las materias
  Object.keys(materiasPorNivel).forEach(nivel => {
    const nivelNum = parseInt(nivel);
    const materiasNivel = materiasPorNivel[nivelNum];

    materiasNivel.forEach(materia => {
      materiasDivs.push(
        <div
          key={materia._id}
          style={{
            width: '100px',
            height: '50px',
            backgroundColor: 'lightblue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            border: '1px solid black',
            borderRadius: '5px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            top: `${materia.nivel * 80}px`, // Espaciado entre niveles
            left: `${materiasNivel.indexOf(materia) * 150}px`, // Espaciado entre materias en el mismo nivel
          }}
        >
          {materia.nombre}
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
        const color = colorMap[materia._id] || '#' + Math.floor(Math.random() * 16777215).toString(16); // Obtener color o generar uno nuevo

        // Registrar el color en el mapa para esta materia
        colorMap[materia._id] = color;

        const distancia = Math.abs(materia.nivel - requerimiento.nivel) * 80; // Distancia entre las materias
        const posicionX1 = materiasPorNivel[materia.nivel].indexOf(materia) * 150 + 50; // Posición X de la primera materia
        const posicionY1 = materia.nivel * 80 + 25; // Posición Y de la primera materia
        const posicionX2 = materiasPorNivel[requerimiento.nivel].indexOf(requerimiento) * 150 + 50; // Posición X de la segunda materia
        const posicionY2 = requerimiento.nivel * 80 + 25; // Posición Y de la segunda materia

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
      {materiasDivs}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {lineasSvg}
      </svg>
    </div>
  );
};

export default MapaConceptual;
