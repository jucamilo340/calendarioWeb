import { useFormik } from "formik";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { getAllMaterias } from '../../../../services/materiasApi';
import SeleccionHorarios from '../../../ModalHorario';

const FormCreate = () => {
  const [materiasL, setMateriasL] = useState([]);
  const [open, setOpen] = useState(false);
  const [horarios, setHorarios] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    nombre: '',
    fechaNacimiento: '',
    correoElectronico: '',
    numeroTelefono: '',
    tituloAcademico: '',
    materias: [],
    disponibilidad: [],
    salario: '',
    auxiliar: false,
  };

  const onSubmit = async (values: any) => {
    // Lógica para enviar el formulario (por completar)
  };

  const getMaterias = async () => {
    const materias = await getAllMaterias();
    setMateriasL(materias);
  };

  useEffect(() => {
    getMaterias();
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="nombre"
          label="Nombre"
          onChange={formik.handleChange}
          value={formik.values.nombre}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          id="fechaNacimiento"
          label="Fecha de Nacimiento"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.fechaNacimiento}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          id="correoElectronico"
          label="Correo Electrónico"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.correoElectronico}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          id="numeroTelefono"
          label="Número de Teléfono"
          type="tel"
          onChange={formik.handleChange}
          value={formik.values.numeroTelefono}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          id="tituloAcademico"
          label="Título Académico"
          onChange={formik.handleChange}
          value={formik.values.tituloAcademico}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="materias-label">Materias</InputLabel>
          <Select
            id="materias"
            name="materias"
            label="Materias"
            multiple
            onChange={formik.handleChange}
            value={formik.values.materias}
          >
            {materiasL.map((e: any) => (
              <MenuItem key={e._id} value={e._id}>{e.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" onClick={handleOpen} sx={{ mb: 2 }}>
          Abrir Modal
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Seleccionar Horarios</DialogTitle>
          <DialogContent>
            <SeleccionHorarios setHorarios={setHorarios} horarios={horarios} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

        <TextField
          id="salario"
          label="Salario"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.salario}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              id="auxiliar"
              name="auxiliar"
              checked={formik.values.auxiliar}
              onChange={formik.handleChange}
            />
          }
          label="Auxiliar"
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
};

const ProfesoresList: React.FC = () => {
  interface Profesor {
    id: number;
    nombre: string;
    disponibilidad: string[];
  }

  const mockProfesores: Profesor[] = [
    { id: 1, nombre: 'Profesor 1', disponibilidad: ['Lunes', 'Miércoles'] },
    { id: 2, nombre: 'Profesor 2', disponibilidad: ['Martes', 'Jueves'] },
    // Agrega más profesores según sea necesario
  ];
  const [profesores, setProfesores] = useState<Profesor[]>(mockProfesores);
  const [selectedProfesor, setSelectedProfesor] = useState<Profesor | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (profesor: Profesor) => {
    setSelectedProfesor(profesor);
    handleOpen();
  };

  const handleDelete = (id: number) => {
    setProfesores((prevProfesores) => prevProfesores.filter((profesor) => profesor.id !== id));
  };

  const handleSave = (values: any) => {
    if (selectedProfesor) {
      // Editar profesor existente
      setProfesores((prevProfesores) =>
        prevProfesores.map((profesor) =>
          profesor.id === selectedProfesor.id ? { ...profesor, ...values } : profesor
        )
      );
    } else {
      // Crear nuevo profesor
      const newProfesor: Profesor = { id: Date.now(), ...values };
      setProfesores((prevProfesores) => [...prevProfesores, newProfesor]);
    }

    setSelectedProfesor(null);
    handleClose();
  };

  return (
    <Box mt={4} mx="auto" p={3} bgcolor="background.paper" boxShadow={3} maxWidth={800}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Disponibilidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profesores.map((profesor) => (
              <TableRow key={profesor.id}>
                <TableCell>{profesor.id}</TableCell>
                <TableCell>{profesor.nombre}</TableCell>
                <TableCell>{profesor.disponibilidad.join(', ')}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(profesor)} color="primary">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(profesor.id)} color="error">
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleOpen} variant="contained" color="success" mt={2}>
        Nuevo Profesor
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedProfesor ? 'Editar Profesor' : 'Nuevo Profesor'}</DialogTitle>
        <DialogContent>
         <FormCreate />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfesoresList;




