import * as React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Box, FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material';
import { getAllSalones } from '../../services/salonesApi';
import { getAllProfesores } from '../../services/profesorCalendarApi';
import { getAllMaterias } from '../../services/materiasApi';
import { useGroupContext } from '../../hooks/GroupContext';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const ModalFiltro = ({ open, onClose }: Props) => {
  const [panel, setPanel] = useState('');
  const [materias, setMaterias] = useState([]);
  const [selectMateria, setSelectMateria] = useState<any>('');

  const [profesores, setProfesores] = useState([]);
  const [selectProfesor, setSelectProfesor] = useState<any>('');

  const [salones, setSalones] = useState([]);
  const [selectSalon, setSelectSalon] = useState<any>('');

  const { filtros, setfiltros, fetchData, setfetchData, selectedGroup } = useGroupContext();

  useEffect(() => {
    // Se ejecutará cuando el componente se monte
    return () => {
      // Se ejecutará cuando el componente se desmonte
      setPanel('');
    };
  }, []);

  const handleClose = () => {
    setPanel('');
    onClose(); // Cerramos el modal
  };

  useEffect(() => {
    getSalones();
    getMaterias();
    getProfesores();
  }, []);

  const getMaterias = async () => {
    const materiasAll = await getAllMaterias();
    setMaterias([...materiasAll, { _id: '', nombre: 'Todos' }]);
  };


  const getProfesores = async () => {
    const profesoresAll = await getAllProfesores();
    setProfesores([...profesoresAll, { _id: '', nombre: 'Todos' }]);
  };

  const getSalones = async () => {
    const salonesAll = await getAllSalones();
    setSalones([...salonesAll, { _id: '', nombre: 'Todos' }]);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose} // Utilizamos nuestra función que también reinicia el panel
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
             <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="materias-label">Materia</InputLabel>
          <Select
            labelId="materias-label"
            id="materias"
            name="materias"
            label="Materia"
            value={selectMateria}
            onChange={(e: any) => {
              setSelectMateria(e?.target?.value);
              setfiltros({...filtros, materia: e?.target?.value._id})
            }}
          >
            {materias.map((materia: any) => (
              <MenuItem key={materia._id} value={materia}>
                {materia.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="profesores-label">Profesor</InputLabel>
          <Select
            labelId="profesores-label"
            id="profesores"
            name="profesores"
            label="Profesor"
            value={selectProfesor}
            onChange={(e: any) => {setSelectProfesor(e?.target?.value); setfiltros({...filtros, profesor: e?.target?.value._id})}}
          >
            {profesores.map((profesor: any) => (
              <MenuItem key={profesor._id} value={profesor}>
                {profesor.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="salones-label">Salon</InputLabel>
          <Select
            labelId="salon-label"
            id="salones"
            name="salones"
            label="Salon"
            value={selectSalon}
            onChange={(e: any) => { setSelectSalon(e?.target?.value); setfiltros({...filtros, salon: e?.target?.value._id})}}
          >
            {salones.map((salon: any) => (
              <MenuItem key={salon._id} value={salon}>
                {salon.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={()=> setfetchData(!fetchData)} sx={{marginLeft: '50px'}} variant="contained" color="primary">
          Aplicar
        </Button>
        </Box>
    </Modal>
  );
};
