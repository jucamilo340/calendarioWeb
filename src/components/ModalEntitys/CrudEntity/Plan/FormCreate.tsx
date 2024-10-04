import React from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
          label="Nombre del Plan"
          margin="normal"
          variant="outlined"
          value={formik.values.nombre}
          onChange={formik.handleChange}
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="semestres-label">Semestres</InputLabel>
          <Select
            labelId="semestres-label"
            id="semestres"
            name="semestres"
            label="Semestres"
            value={formik.values.semestres}
            onChange={formik.handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>


<FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="semestres-label">Horario</InputLabel>
          <Select
            labelId="semestres-label"
            id="horario"
            name="horario"
            label="horario"
            value={formik.values.horario}
            onChange={formik.handleChange}
          >
            <MenuItem value={'Diurno'}>Diurno</MenuItem>
            <MenuItem value={'Nocturno'}>Nocturno</MenuItem>
          </Select>
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
