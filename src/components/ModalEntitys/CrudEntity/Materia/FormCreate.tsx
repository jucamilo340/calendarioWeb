import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { getAllMaterias } from '../../../../services/materiasApi';
import { useGroupContext } from '../../../../hooks/GroupContext';

interface FormCreateProps {
  initialValues: any;
  onSubmit: (values: any) => void;
}

const FormCreate: React.FC<FormCreateProps> = ({ initialValues, onSubmit }) => {

  const [materiasL, setMateriasL] = React.useState([]);
  const { selectedPlan } = useGroupContext();  
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  const getMaterias = async () => {
    const materias = await getAllMaterias({ plan: selectedPlan._id });
    setMateriasL(materias);
  };

  useEffect(() => {
    getMaterias();
  }, []);

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
          id="sesiones"
          name="sesiones"
          label="N# de sesiones"
          type="number"
          margin="normal"
          variant="outlined"
          value={formik.values.sesiones}
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

        <FormControl fullWidth>
        <InputLabel>Nivel/Semestre</InputLabel>
          <Select  id="nivel" name="nivel" label="Tipo de Contrato" value={formik.values.nivel} onChange={formik.handleChange} onBlur={formik.handleBlur}>
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
          </Select>
        </FormControl>

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

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tipo</InputLabel>
          <Select  id="tipo" name="tipo" label="Tipo de Asignatura" value={formik.values.tipo} onChange={formik.handleChange} onBlur={formik.handleBlur}>
              <MenuItem value="carrera">Carrera</MenuItem>
              <MenuItem value="electiva">Electiva</MenuItem>
          </Select>
        </FormControl>

         <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="materias-label">Materias requeridas</InputLabel>
          <Select
            id="requerimientos"
            name="requerimientos"
            label="Materias requeridas"
            multiple
            value={formik.values.requerimientos}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {materiasL.map((materia: any) => (
              <MenuItem key={materia._id} value={materia._id}>
                {materia.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Tipo de salon <span style={{color:"red"}}>Opcional</span></InputLabel>
          <Select  id="tipoSalon" name="tipoSalon" label="Tipo de Asignatura" value={formik.values.tipoSalon} onChange={formik.handleChange} onBlur={formik.handleBlur}>
              <MenuItem value="aula">Aula</MenuItem>
              <MenuItem value="sala">Sala Computacion</MenuItem>
              <MenuItem value="laboratorio">Laboratorio</MenuItem>
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
