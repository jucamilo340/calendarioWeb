import React from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';

interface FormCreateProps {
  initialValues: any;
  onSubmit: (values: any) => void;
}

const FormCreate: React.FC<FormCreateProps> = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

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
          id="horas"
          name="horas"
          label="Horas"
          type="number"
          margin="normal"
          variant="outlined"
          value={formik.values.horas}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          id="horasSemanales"
          name="horasSemanales"
          label="Horas Semanales"
          type="number"
          margin="normal"
          variant="outlined"
          value={formik.values.horasSemanales}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          id="credits"
          name="credits"
          label="Créditos"
          type="number"
          margin="normal"
          variant="outlined"
          value={formik.values.credits}
          onChange={formik.handleChange}
        />

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
