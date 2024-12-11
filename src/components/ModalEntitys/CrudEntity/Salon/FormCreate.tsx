// @ts-nocheck
import React from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
      const valuesNew = {...values, ocupacion: horarios}
      onSubmit(valuesNew);
    },
  });

  const [open, setOpen] = React.useState(false);
  const [horarios, setHorarios] = React.useState<string[]>(initialValues?.ocupacion ? initialValues?.ocupacion: []);

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

        <FormControl fullWidth>
          <InputLabel>Tipo</InputLabel>
          <Select  id="tipo" name="tipo" label="Tipo de Salon" value={formik.values.tipo} onChange={formik.handleChange} onBlur={formik.handleBlur}>
              <MenuItem value="aula">Aula</MenuItem>
              <MenuItem value="sala">Sala Computacion</MenuItem>
              <MenuItem value="laboratorio">Laboratorio</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Facultad</InputLabel>
          <Select  id="facultad" name="facultad" label="Facultad" value={formik.values.facultad} onChange={formik.handleChange} onBlur={formik.handleBlur}>
              <MenuItem value="ingenieria">Ingenieria</MenuItem>
              <MenuItem value="otro">Otro</MenuItem>
          </Select>
        </FormControl>

        {/* Ajusta según la cantidad de rangos horarios que desees */}
        <Button variant="outlined" onClick={handleOpen} sx={{ mb: 2 }}>
          Abrir Horaria Rentringuido
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
