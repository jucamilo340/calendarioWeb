import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Horarios, convertirRangoHorario } from '../../constants/metodos';

interface Horario {
  dia: string;
  inicio: string;
  fin: string;
}

interface SeleccionHorariosProps {
  horarios: Horario[];
  setHorarios: React.Dispatch<React.SetStateAction<Horario[]>>;
}

const SeleccionHorarios: React.FC<SeleccionHorariosProps> = ({ horarios, setHorarios }) => {
  const [diaSeleccionado, setDiaSeleccionado] = useState<string>('');
  const [horaInicioSeleccionada, setHoraInicioSeleccionada] = useState<string>('');
  const [horaFinSeleccionada, setHoraFinSeleccionada] = useState<string>('');

  const handleDiaSeleccionado = (e: React.ChangeEvent<{ value: unknown }>) => {
    setDiaSeleccionado(e.target.value as string);
  };

  const handleHoraInicioSeleccionada = (e: React.ChangeEvent<{ value: unknown }>) => {
    setHoraInicioSeleccionada(e.target.value as string);
  };

  const handleHoraFinSeleccionada = (e: React.ChangeEvent<{ value: unknown }>) => {
    setHoraFinSeleccionada(e.target.value as string);
  };

  const handleAgregarHorario = () => {
    if (diaSeleccionado && horaInicioSeleccionada && horaFinSeleccionada) {
      setHorarios((prevHorarios: Horario[]) => [
        ...prevHorarios,
        {
          dia: diaSeleccionado,
          inicio: horaInicioSeleccionada,
          fin: horaFinSeleccionada,
        },
      ]);
      setDiaSeleccionado('');
      setHoraInicioSeleccionada('');
      setHoraFinSeleccionada('');
    }
  };

  const handleEliminarHorario = (index: number) => {
    setHorarios((prevHorarios: Horario[]) => {
      const nuevosHorarios = [...prevHorarios];
      nuevosHorarios.splice(index, 1);
      return nuevosHorarios;
    });
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Día</InputLabel>
        <Select label="Día" value={diaSeleccionado} onChange={handleDiaSeleccionado}>
          <MenuItem value="lunes">Lunes</MenuItem>
          <MenuItem value="martes">Martes</MenuItem>
          <MenuItem value="miercoles">Miércoles</MenuItem>
          <MenuItem value="jueves">Jueves</MenuItem>
          <MenuItem value="viernes">Viernes</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Hora de inicio</InputLabel>
        <Select
          label="Hora de inicio"
          value={horaInicioSeleccionada}
          onChange={handleHoraInicioSeleccionada}
        >
          {Horarios.map((h)=> (
            <MenuItem key={h} value={h}>{h}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Hora de fin</InputLabel>
        <Select
          label="Hora de fin"
          value={horaFinSeleccionada}
          onChange={handleHoraFinSeleccionada}
        >
          {Horarios.map((h)=> (
            <MenuItem key={h} value={h}>{h}</MenuItem>
          ))}
        </Select>
      </FormControl>


      <Button variant="contained" onClick={handleAgregarHorario} sx={{ mt: 2 }}>
        Agregar Horario
      </Button>

      <div>
        <h3>Horarios Seleccionados</h3>
        <List>
          {horarios.map((horario, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText
                primary={`${horario.dia} - ${horario.inicio} a ${horario.fin}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleEliminarHorario(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default SeleccionHorarios;

