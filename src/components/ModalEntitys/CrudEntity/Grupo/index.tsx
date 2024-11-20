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
  getAllGrupos,
  createGrupo,
  updateGrupo,
  deleteGrupo,
} from '../../../../services/grupoApi'; // Update the import based on your actual API service
import { useGroupContext } from '../../../../hooks/GroupContext';
import { getAllPlanes } from '../../../../services/planApi';

const GrupoList: React.FC = () => {
  interface Grupo {
    _id: string;
    nombre: string;
    semestre: number;
    cantidad: number;
    diurno: boolean;
  }

  const initialValues = {
    nombre: '',
    semestre: 0,
    cantidad: 0,
    diurno: true,
  };

  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [planes, setPlanes] = useState<Grupo[]>([]);
  const [selectedGrupo, setSelectedGrupo] = useState<Grupo | null>(null);
  const [open, setOpen] = useState(false);
  const { setfetchGroup, fetchGroup } = useGroupContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPlanes = async () => {
    try {
      const response = await getAllPlanes(); // Actualiza la llamada a la API
      setPlanes(response);
    } catch (error) {
      console.error('Error fetching planes:', error);
    }
  };

  const getGrupos = async () => {
    try {
      const response = await getAllGrupos(); // Update the API call based on your actual API
      setGrupos(response);
    } catch (error) {
      console.error('Error fetching grupos:', error);
    }
  };
 
  useEffect(() => {
    getGrupos();
    getPlanes();
  }, []);

  const handleEdit = (grupo: Grupo) => {
    setSelectedGrupo(grupo);
    handleOpen();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGrupo(id);
      setfetchGroup(!fetchGroup);
      getGrupos();
    } catch (error) {
      console.error('Error deleting grupo:', error);
    }
  };

  const handleSave = async (values: any) => {
    try {
      if (selectedGrupo) {
        // Edit existing grupo
        await updateGrupo(values); // Update the API call based on your actual API
      } else {
        // Create new grupo
        console.log('values:', values);
        await createGrupo(values); // Update the API call based on your actual API
      }
      setfetchGroup(!fetchGroup);
      getGrupos();
      setSelectedGrupo(null);
      handleClose();
    } catch (error) {
      console.error('Error saving grupo:', error);
    }
  };

  return (
    <Box mt={4} mx="auto" p={3} bgcolor="background.paper" boxShadow={3} maxWidth={800}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Semestre</TableCell>
              <TableCell>Cantidad de Estudiantes</TableCell>
              <TableCell>Diurno</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grupos.map((grupo) => (
              <TableRow key={grupo._id}>
                <TableCell>{grupo.nombre}</TableCell>
                <TableCell>{grupo.semestre}</TableCell>
                <TableCell>{grupo.cantidad}</TableCell>
                <TableCell>{grupo.diurno ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(grupo)} color="primary">
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(grupo._id)} color="error">
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={handleOpen} variant="contained" color="success" mt={2}>
        Nuevo Grupo
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedGrupo ? 'Editar Grupo' : 'Nuevo Grupo'}</DialogTitle>
        <DialogContent>
          <FormCreate initialValues={selectedGrupo || initialValues} onSubmit={handleSave} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GrupoList;
