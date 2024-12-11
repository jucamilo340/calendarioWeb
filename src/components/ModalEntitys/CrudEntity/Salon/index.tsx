// @ts-nocheck
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
import { ToastContainer, toast } from 'react-toastify';
import Horario from '../profesor/Calendar';

const SalonesList: React.FC = () => {
  interface RangoHorario {
    dia: string;
    inicio: string;
    fin: string;
  }

  interface Salon {
    _id: string;
    nombre: string;
    tipo: string;
    capacidad: number;
    ocupacion: RangoHorario[];
  }

  const initialValues = {
    nombre: '',
    capacidad: 0,
    tipo: '',
    facultad: '',
    // disponibilidad: [{ dia: '', inicio: '', fin: '' }],
  };

  const [salones, setSalones] = useState<Salon[]>([]);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [open, setOpen] = useState(false);
  const [showCalendar, setshowCalendar] = useState(false);
  const [calendarNow, setcalendarNow] = useState([]);

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
    try {
      if (selectedSalon) {
        // Editar salón existente
        await updateSalon({ salon: { _id: selectedSalon._id, ...values } });
      } else {
        // Crear nuevo salón
        await createSalon({ salon: values });
      }
      toast.success("Salon creado Exitosamente !", {
        position: "top-center"
      });
    } catch (error) {
      toast.error(error?.response?.data?.message,{
        position: "top-center"
      });
    }

    getSalones();
    setSelectedSalon(null);
    handleClose();
  };

  return (
    <Box mt={4} mx="auto" p={3} bgcolor="background.paper" boxShadow={3} maxWidth={800}>
      <div>
        <ToastContainer />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Capacidad</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salones.map((salon) => (
              <TableRow key={salon._id}>
                <TableCell>{salon.nombre}</TableCell>
                <TableCell>{salon.tipo}</TableCell>
                <TableCell>{salon.capacidad}</TableCell>
                <TableCell>
                <Button
                      onClick={() => {
                        setcalendarNow(salon?.ocupacion);
                        setshowCalendar(true);
                      }}
                      variant="contained"
                      color="success"
                      mt={2}
                    >
                      Ver Horario
                    </Button>
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
      <Dialog
        open={showCalendar}
        onClose={() => setshowCalendar(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Calendario del profesor</DialogTitle>
        <DialogContent>
          <Horario eventos={calendarNow} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SalonesList;
