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
  getAllSalones,
  createSalon,
  updateSalon,
  deleteSalon,
} from '../../../../services/salonesApi';

const SalonesList: React.FC = () => {
  interface RangoHorario {
    dia: string;
    inicio: string;
    fin: string;
  }

  interface Salon {
    _id: string;
    nombre: string;
    capacidad: number;
    ocupacion: RangoHorario[];
  }

  const initialValues = {
    nombre: '',
    capacidad: 0,
    // disponibilidad: [{ dia: '', inicio: '', fin: '' }],
  };

  const [salones, setSalones] = useState<Salon[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSalones = async () => {
    const response = await getAllSalones();
    setSalones(response);
  };

  useEffect(() => {
    getSalones();
  }, []);

  const handleEdit = (salon: Salon) => {
    setSelectedSalon(salon);
    handleOpen();
  };

  const handleDelete = async (id: string) => {
    await deleteSalon({ id });
    getSalones();
  };

  const handleSave = async (values: any) => {
    if (selectedSalon) {
      // Editar salón existente
      await updateSalon({ salon: { _id: selectedSalon._id, ...values } });
    } else {
      // Crear nuevo salón
      await createSalon({ salon: values });
    }

    getSalones();
    setSelectedSalon(null);
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
              <TableCell>Capacidad</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salones.map((salon) => (
              <TableRow key={salon._id}>
                <TableCell>{salon._id}</TableCell>
                <TableCell>{salon.nombre}</TableCell>
                <TableCell>{salon.capacidad}</TableCell>
                <TableCell>
    {salon.ocupacion.map((dis: any) => (
      <>
      <span key={dis._id}>{dis.dia} - {dis.inicio} - {dis.fin}</span><br/>
      </>
    ))}
    </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(salon)} color="primary">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(salon._id)} color="error">
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleOpen} variant="contained" color="success" mt={2}>
        Nuevo Salón
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedSalon ? 'Editar Salón' : 'Nuevo Salón'}</DialogTitle>
        <DialogContent>
          <FormCreate initialValues={selectedSalon || initialValues} onSubmit={handleSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SalonesList;
