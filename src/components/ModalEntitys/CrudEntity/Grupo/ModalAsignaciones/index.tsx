// @ts-nocheck
import * as React from 'react';
import {
  Modal,
  Box,
  TableContainer,
  TableHead,
  Table,
  TableCell,
  TableBody,
  TableRow,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from '@mui/material';
import { getAsignaciones, updateAsignacion } from '../../../../../services/grupoApi';
import { getAllProfesores } from '../../../../../services/profesorCalendarApi';
import { toast } from 'react-toastify';

type Props = {
  open: boolean;
  onClose: () => void;
  grupo: any;
};

export const ModalAsignaciones = ({ open, onClose, grupo }: Props) => {
  const [asignaciones, setAsignaciones] = React.useState([]);
  const [profesores, setProfesores] = React.useState([]);

  const getAsignacionesGroup = async () => {
    if (grupo?._id) {
      try {
        const gruposAll = await getAsignaciones(grupo._id);
        setAsignaciones(gruposAll);
      } catch (error) {
        toast.error('Error al cargar asignaciones.', { position: 'top-center' });
      }
    }
  };

  const getProfesores = async () => {
    try {
      const profesoresAll = await getAllProfesores();
      setProfesores([...profesoresAll, { _id: 1, nombre: 'Sin profesor' }]);
    } catch (error) {
      toast.error('Error al cargar profesores.', { position: 'top-center' });
    }
  };

  React.useEffect(() => {
    if (grupo) {
      getAsignacionesGroup();
      getProfesores();
    }
  }, [grupo]);

  const handleSave = async (profesor: any, asignacion: any) => {
    try {
      asignacion.profesor = profesor._id;
      await updateAsignacion(asignacion);
      toast.success('¡Asignación exitosa!', { position: 'top-center' });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error al asignar profesor', {
        position: 'top-center',
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxHeight: '90vh',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" mb={2}>
          Materias del grupo {grupo?.nombre}
        </Typography>
        <Typography variant="subtitle1" mb={3}>
          Jornada: {grupo?.diurno ? 'Diurno' : 'Nocturno'}
        </Typography>
        <TableContainer
          sx={{
            maxHeight: '60vh',
            overflowY: 'auto',
            '& thead th': {
              position: 'sticky',
              top: 0,
              backgroundColor: 'background.paper',
              zIndex: 1,
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Grupo</TableCell>
                <TableCell align="center">Materia</TableCell>
                <TableCell align="center">Profesor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {asignaciones.length > 0 ? (
                asignaciones.map((asignacion: any) => (
                  <RowAsignacion
                    key={asignacion._id}
                    asignacion={asignacion}
                    profesores={profesores}
                    handleSave={handleSave}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay asignaciones disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

const RowAsignacion = ({ asignacion, profesores, handleSave }: any) => {
  const [selected, setSelected] = React.useState(asignacion?.profesor?._id || '');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedProfesorId = event.target.value as any;
    setSelected(selectedProfesorId);
    const selectedProfesor = profesores.find((profesor: any) => profesor._id === selectedProfesorId);
    handleSave(selectedProfesor, asignacion);
  };

  return (
    <TableRow>
      <TableCell align="center">{asignacion?.grupo?.nombre || 'Sin grupo'}</TableCell>
      <TableCell align="center">{asignacion?.materia?.nombre || 'Sin materia'}</TableCell>
      <TableCell align="center">
        <FormControl fullWidth>
          <InputLabel id={`profesor-label-${asignacion._id}`}>Profesor</InputLabel>
          <Select
            labelId={`profesor-label-${asignacion._id}`}
            id={`profesor-select-${asignacion._id}`}
            value={selected}
            onChange={handleChange}
          >
            {profesores.map((profesor: any) => (
              <MenuItem key={profesor._id} value={profesor._id}>
                {profesor.cedula ? `${profesor.cedula} - ` : ''} {profesor.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default ModalAsignaciones;
