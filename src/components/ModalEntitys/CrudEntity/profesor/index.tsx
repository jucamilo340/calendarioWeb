import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import FormCreate from './FormCreate';
import {
  getAllProfesores,
  createProfesor,
  updateProfesor,
  deleteProfesor,
} from '../../../../services/profesorCalendarApi';

const ProfesoresList: React.FC = () => {
  interface Profesor {
    _id: string;
    nombre: string;
    ocupacion: string[];
  }

  const initialValues = {
    nombre: '',
    fechaNacimiento: '',
    correoElectronico: '',
    numeroTelefono: '',
    tituloAcademico: '',
    materias: [],
    disponibilidad: [],
    salario: '',
    tipo: '',
    auxiliar: false,
  };

  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [selectedProfesor, setSelectedProfesor] = useState<Profesor | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProfesores = async () => {
    const response = await getAllProfesores();
    setProfesores(response);
  };

  useEffect(() => {
     getProfesores();
  }, []);

  const handleEdit = (profesor: Profesor) => {
    setSelectedProfesor(profesor);
    handleOpen();
  };

  const handleDelete = async (id: string) => {
    await deleteProfesor({ id });
    getProfesores();
  };

  const handleSave = async (values: any) => {
    if (selectedProfesor) {
      // Editar profesor existente
      await updateProfesor({ profesor: { _id: selectedProfesor._id, ...values } });
    } else {
      // Crear nuevo profesor
      await createProfesor({ profesor: values });
    }

    getProfesores();
    setSelectedProfesor(null);
    handleClose();
  };

  console.log(profesores);

  const getColorClass = (horasAsignadas, tipoProfesor) => {
    if (
      (tipoProfesor === 'catedratico' && (horasAsignadas < 8 || horasAsignadas > 16)) ||
      ((tipoProfesor === 'carrera' || tipoProfesor === "contrato") && (horasAsignadas < 12 || horasAsignadas > 16))
    ) {
      return 'red';
    }
    return 'green';
  };

  return (
    <Box mt={4} mx="auto" p={3} bgcolor="background.paper" boxShadow={3} maxWidth={800}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{width: '20%'}}>ID</TableCell>
              <TableCell style={{width: '20%'}}>Nombre</TableCell>
              <TableCell style={{width: '20%'}}>Horas Asignadas</TableCell>
              <TableCell style={{width: '20%'}}>Horarios</TableCell>
              <TableCell style={{width: '20%'}}>Acciones</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <div style={{ maxHeight: 400, overflow: 'auto' }}>
        <TableContainer>
          <Table>
            <TableBody>
              {profesores.map((profesor) => (
                <TableRow key={profesor._id}>
                  <TableCell style={{width: '20%'}}>{profesor._id}</TableCell>
                  <TableCell style={{width: '20%'}}>{profesor.nombre}</TableCell>
                  <TableCell style={{width: '20%', fontWeight: 'bold', fontSize: '20px', color: getColorClass(profesor.horasAsignadas, profesor.tipo) }}>{profesor.horasAsignadas}</TableCell>
                  <TableCell style={{width: '20%'}}>
                    {profesor.ocupacion.map((dis: any) => (
                      <>
                        <span key={dis._id}>{dis.dia} - {dis.inicio} - {dis.fin}</span><br />
                      </>
                    ))}
                  </TableCell>
                  <TableCell style={{width: '20%'}}>
                    <Button onClick={() => handleEdit(profesor)} color="primary">
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(profesor._id)} color="error">
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Button onClick={handleOpen} variant="contained" color="success" mt={2}>
        Nuevo Profesor
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedProfesor ? 'Editar Profesor' : 'Nuevo Profesor'}</DialogTitle>
        <DialogContent>
          <FormCreate initialValues={selectedProfesor || initialValues} onSubmit={handleSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfesoresList;
