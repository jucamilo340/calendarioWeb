import React, { useState } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';

const TimeRangeSelector: React.FC = () => {
  const [seleccion, setSeleccion] = useState({
    dia: '',
    inicio: '',
    fin: '',
  });

  const obtenerDiasDeLaSemana = () => {
    const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const hoy = new Date();
    const diasDeLaSemana = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(hoy);
      dia.setDate(hoy.getDate() + i);
      diasDeLaSemana.push(dias[dia.getDay()]);
    }
    return diasDeLaSemana;
  };

  const handleCambio = (campo: string, valor: string) => {
    setSeleccion((prevSeleccion) => ({
      ...prevSeleccion,
      [campo]: valor,
    }));
  };

  const guardarEnFormatoDeseado = () => {
    const { dia, inicio, fin } = seleccion;
  
    try {
      if (dia && inicio && fin) {
  
        const formatoInicio = new Date(`${dia}T${inicio}:00`);
        const formatoFin = new Date(`${dia}T${fin}:00`);
  
        // Verificar si las fechas son válidas
        if (isNaN(formatoInicio.getTime()) || isNaN(formatoFin.getTime())) {
          throw new Error('Las horas ingresadas no son válidas.');
        }
  
        const resultado = {
          inicio: formatoInicio.toISOString(),
          fin: formatoFin.toISOString(),
        };
        // Aquí podrías enviar el resultado a tu API, almacenar en el estado global, etc.
      } else {
        throw new Error('Selecciona un día y un rango de horas válido.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Día"
            select
            SelectProps={{
              native: true,
            }}
            value={seleccion.dia}
            onChange={(e) => handleCambio('dia', e.target.value)}
          >
            <option disabled value="">
              Seleccione un día
            </option>
            {obtenerDiasDeLaSemana().map((dia) => (
              <option key={dia} value={dia}>
                {dia}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Hora de inicio"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 minutes
            }}
            value={seleccion.inicio}
            onChange={(e) => handleCambio('inicio', e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Hora de fin"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 minutes
            }}
            value={seleccion.fin}
            onChange={(e) => handleCambio('fin', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={guardarEnFormatoDeseado}
          >
            Guardar en Formato Deseado
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TimeRangeSelector;
