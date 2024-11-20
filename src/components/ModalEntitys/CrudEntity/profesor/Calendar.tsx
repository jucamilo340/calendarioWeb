import React from 'react';
import styled from 'styled-components';

interface Evento {
  dia: string;
  inicio: string;
  fin: string;
  nombre: string;
  _id: string;
}

interface HorarioProps {
  eventos: Evento[];
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(6, 1fr);
  gap: 1px;
  background-color: #ddd;
`;

const Header = styled.div`
  display: contents;
`;

const HeaderCell = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;

const TimeCell = styled.div`
  background-color: #eaeaea;
  padding: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: contents;
`;

const Cell = styled.div<{ evento?: boolean }>`
  background-color: ${(props) => (props.evento ? '#ffcccb' : '#fff')};
  padding: 20px;
  text-align: center;
  height: 100px;
  border: 1px solid #ccc;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Horario: React.FC<HorarioProps> = ({ eventos }) => {
  const dias: string[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const horas: string[] = [
    '07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00',
  ];

  const estaDentroDelRango = (inicio: string, fin: string, hora: string): boolean => {
    return hora >= inicio && hora < fin;
  };

  return (
    <GridContainer>
      <Header>
        <TimeCell>Hora</TimeCell>
        {dias.map((dia) => (
          <HeaderCell key={dia}>{dia}</HeaderCell>
        ))}
      </Header>
      {horas.map((hora, index) => (
        <Row key={hora}>
          <TimeCell>{hora} - {`${parseInt(hora.split(':')[0]) + 2}:00`}</TimeCell>
          {dias.map((dia) => {
            const evento = eventos.find(
              (e) =>
                e.dia === dia &&
                estaDentroDelRango(e.inicio, e.fin, hora)
            );
            return (
              <Cell key={`${dia}-${hora}`} evento={!!evento}>
                {evento ? <div>{evento.nombre || evento?.nombreClase}</div> : ''}
              </Cell>
            );
          })}
        </Row>
      ))}
    </GridContainer>
  );
};

export default Horario;
