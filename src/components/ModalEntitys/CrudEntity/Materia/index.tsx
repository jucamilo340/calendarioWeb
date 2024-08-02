import React, { useState, useEffect, Fragment } from 'react';
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
import MapaConceptual from './Pensum';

const MateriasList: React.FC = () => {
  interface Materia {
    _id: string;
    nombre: string;
    sesiones: number;
    nivel: number;
    horasSemanales: number;
    credits: number;
  }

  const initialValues = {
    nombre: '',
    sesisones: 0,
    credits: 0,
    requerimientos: []
  };

  const [materias, setMaterias] = useState<Materia[]>([]);
  const [materiasPorNivel, setMateriasPorNivel] = useState<{ [key: number]: Materia[] }>({});
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);
  const [open, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);

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

  useEffect(() => {
    const sortedMaterias = [...materias].sort((a, b) => a.nivel - b.nivel);
    const materiasOrganizadas: { [key: number]: Materia[] } = {};

    sortedMaterias.forEach((materia) => {
      if (!materiasOrganizadas[materia.nivel]) {
        materiasOrganizadas[materia.nivel] = [];
      }
      materiasOrganizadas[materia.nivel].push(materia);
    });

    setMateriasPorNivel(materiasOrganizadas);
  }, [materias]);

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
      await updateMateria({ materia: { _id: selectedMateria._id, ...values } });
    } else {
      await createMateria({ materia: values });
    }

    getMaterias();
    setSelectedMateria(null);
    handleClose();
  };

  return (
    <Box mt={4} mx="auto" p={3} bgcolor="background.paper" boxShadow={3} maxWidth={800}>
      <Button variant="outlined" onClick={()=> setOpenM(true)} sx={{ mb: 2 }}>
          Abrir Pensum
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>N# de Sesiones</TableCell>
              <TableCell>Horas Semanales</TableCell>
              <TableCell>Créditos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          </Table>
      </TableContainer>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          <TableContainer>
          <Table>
          <TableBody>
            {Object.keys(materiasPorNivel).map((nivel) => (
              <Fragment key={nivel}>
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    Nivel {nivel}
                  </TableCell>
                </TableRow>
                {materiasPorNivel[parseInt(nivel)].map((materia) => (
                  <TableRow key={materia._id}>
                    <TableCell>{materia._id}</TableCell>
                    <TableCell>{materia.nombre}</TableCell>
                    <TableCell>{materia.sesiones}</TableCell>
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
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>

      <Button onClick={handleOpen} variant="contained" color="success" mt={2}>
        Nueva Materia
      </Button>

      <Dialog open={openM} onClose={()=> setOpenM(false)}>
          <DialogTitle>Pensum Academico</DialogTitle>
          <DialogContent style={{width:"1000px", height:"500px"}}>
            <MapaConceptual 
              materias={materias} 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> setOpenM(false)} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

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
