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
  getAllMaterias,
  createMateria,
  updateMateria,
  deleteMateria,
} from '../../../../services/materiasApi';

const MateriasList: React.FC = () => {
  interface Materia {
    _id: string;
    nombre: string;
    horas: number;
    horasSemanales: number;
    credits: number;
  }

  const initialValues = {
    nombre: '',
    horas: 0,
    credits: 0,
  };

  const [materias, setMaterias] = useState<Materia[]>([]);
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMaterias = async () => {
    const response = await getAllMaterias();
    setMaterias(response);
  };

  useEffect(() => {
    getMaterias();
  }, []);

  const handleEdit = (materia: Materia) => {
    setSelectedMateria(materia);
    handleOpen();
  };

  const handleDelete = async (id: string) => {
    await deleteMateria({ id });
    getMaterias();
  };

  const handleSave = async (values: any) => {
    if (selectedMateria) {
      // Editar materia existente
      await updateMateria({ materia: { _id: selectedMateria._id, ...values } });
    } else {
      // Crear nueva materia
      await createMateria({ materia: values });
    }

    getMaterias();
    setSelectedMateria(null);
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
              <TableCell>Horas</TableCell>
              <TableCell>Horas Semanales</TableCell>
              <TableCell>Créditos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materias.map((materia) => (
              <TableRow key={materia._id}>
                <TableCell>{materia._id}</TableCell>
                <TableCell>{materia.nombre}</TableCell>
                <TableCell>{materia.horas}</TableCell>
                <TableCell>{materia.horasSemanales}</TableCell>
                <TableCell>{materia.credits}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(materia)} color="primary">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(materia._id)} color="error">
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleOpen} variant="contained" color="success" mt={2}>
        Nueva Materia
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedMateria ? 'Editar Materia' : 'Nueva Materia'}</DialogTitle>
        <DialogContent>
          <FormCreate initialValues={selectedMateria || initialValues} onSubmit={handleSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MateriasList;
