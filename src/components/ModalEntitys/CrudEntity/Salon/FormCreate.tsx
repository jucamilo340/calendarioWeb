import React from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import SeleccionHorarios from '../../../ModalHorario';

interface FormCreateProps {
  initialValues: any;
  onSubmit: (values: any) => void;
}

const FormCreate: React.FC<FormCreateProps> = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const valuesNew = {...values, disponibilidad: horarios}
      onSubmit(valuesNew);
    },
  });

  const [open, setOpen] = React.useState(false);
  const [horarios, setHorarios] = React.useState<string[]>(initialValues?.disponibilidad ? initialValues?.disponibilidad: []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="nombre"
          name="nombre"
          label="Nombre"
          margin="normal"
          variant="outlined"
          value={formik.values.nombre}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          id="capacidad"
          name="capacidad"
          label="Capacidad"
          type="number"
          margin="normal"
          variant="outlined"
          value={formik.values.capacidad}
          onChange={formik.handleChange}
        />

        {/* Ajusta según la cantidad de rangos horarios que desees */}
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

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormCreate;
