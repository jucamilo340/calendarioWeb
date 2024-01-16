import React from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';
import { useFormik } from 'formik';

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

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="semestre-label">Semestre</InputLabel>
          <Select
            labelId="semestre-label"
            id="semestre"
            name="semestre"
            label="Semestre"
            value={formik.values.semestre}
            onChange={formik.handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            {/* Add more semestre options as needed */}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="diurno-label">Diurno</InputLabel>
          <Checkbox
            id="diurno"
            name="diurno"
            checked={formik.values.diurno}
            onChange={formik.handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </FormControl>

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