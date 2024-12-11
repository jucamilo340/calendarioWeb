// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
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
  getAllPlanes,
  createPlan,
  updatePlan,
  deletePlan,
} from '../../../../services/planApi'; // Actualiza la importación según tu servicio de API
//import { usePlanContext } from '../../../../hooks/PlanContext';

const PlanList: React.FC = () => {
  interface Plan {
    _id: string;
    nombre: string;
    semestres: number;
    horario: string;
  }

  const initialValues = {
    nombre: '',
    semestres: 0,
    horario: '',
  };

  const [planes, setPlanes] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [open, setOpen] = useState(false);
  //const { setFetchPlan, fetchPlan } = usePlanContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlan(null); // Resetear el plan seleccionado al cerrar el diálogo
  };

  const getPlanes = async () => {
    try {
      const response = await getAllPlanes(); // Actualiza la llamada a la API
      setPlanes(response);
    } catch (error) {
      console.error('Error fetching planes:', error);
    }
  };

  useEffect(() => {
    getPlanes();
  }, []);

  const handleEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    handleOpen();
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePlan(id);
      //setFetchPlan(!fetchPlan);
      getPlanes();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const handleSave = async (values: any) => {
    try {
      if (selectedPlan) {
        // Editar plan existente
        await updatePlan(selectedPlan._id, values); // Actualiza la llamada a la API
      } else {
        // Crear nuevo plan
        await createPlan(values); // Actualiza la llamada a la API
      }
      //setFetchPlan(!fetchPlan);
      getPlanes();
      setSelectedPlan(null);
      handleClose();
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  return (
    <Box mt={4} mx="auto" p={3} bgcolor="background.paper" boxShadow={3} maxWidth={800}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Semestres</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planes.map((plan) => (
              <TableRow key={plan._id}>
                <TableCell>{plan.nombre}</TableCell>
                <TableCell>{plan.semestres}</TableCell>
                <TableCell>{plan.horario}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(plan)} color="primary">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(plan._id)} color="error">
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleOpen} variant="contained" color="success" mt={2}>
        Nuevo Plan
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedPlan ? 'Editar Plan' : 'Nuevo Plan'}</DialogTitle>
        <DialogContent>
          <FormCreate initialValues={selectedPlan || initialValues} onSubmit={handleSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PlanList;
