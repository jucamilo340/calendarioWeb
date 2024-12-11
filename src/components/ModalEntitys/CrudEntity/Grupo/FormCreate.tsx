// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import { getAllPlanes } from '../../../../services/planApi';

interface FormCreateProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  selectedGrupo?: any;
}

const FormCreate: React.FC<FormCreateProps> = ({ initialValues, onSubmit, selectedGrupo }) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      values.plan = values.plan._id;
      onSubmit(values);
    },
  });
  const [planes, setPlanes] = useState<any[]>([]);

  const getPlanes = async () => {
    try {
      const response = await getAllPlanes();
      setPlanes(response);
    } catch (error) {
      console.error('Error fetching planes:', error);
    }
  };

  useEffect(() => {
    getPlanes();
  }, []);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth sx={{ mb: 2, mt: 5 }}>
          <InputLabel id="materias-label">Plan de Estudio</InputLabel>
          <Select
            labelId="materias-label"
            id="plan"
            disabled={selectedGrupo}
            name="plan"
            label="Plan de Estudio"
            //value={selectMateria}
            // onChange={(e: any) => {
            //   getProfesores(e?.target?.value);
            //   getSalones(e?.target?.value);
            //   setSelectMateria(e?.target?.value);
            // }}
            onChange={formik.handleChange}
          >
            {planes?.map((plan: any) => (
              <MenuItem key={plan._id} value={plan}>
                {plan.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          id="codigo"
          name="codigo"
          label="codigo"
          margin="normal"
          variant="outlined"
          value={formik.values.codigo}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          id="cantidad"
          name="cantidad"
          label="Cantidad de Estudiantes"
          margin="normal"
          variant="outlined"
          value={formik.values.cantidad}
          onChange={formik.handleChange}
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="semestre-label">Semestre/Nivel</InputLabel>
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
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
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
