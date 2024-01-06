import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  createMateria,
} from '../../../../services/materiasApi';

const FormCreate = () => {

    const initialValues = {
      nombre: '',
      horas:'',
      creditos: ''
    };
  
    const onSubmit = async (values: any) => {
      try {
        await createMateria({
          materia: {
            nombre: values.nombre,
            credits: values.creditos,
            horas: values.horas,
          },
        });
      } catch (err) {
        toast.error('Hubo un Error al crear las materia');
      } 
    };
  
    const formik = useFormik({
      initialValues,
      onSubmit,
    });

    return (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <form onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          id="nombre"
          label="Nombre"
          onChange={formik.handleChange}
          value={formik.values.nombre}
          fullWidth
        />
      </div>
      <div>
        <TextField
          id="horas"
          label="Horas"
          onChange={formik.handleChange}
          value={formik.values.horas}
          fullWidth
          type='number'
        />
      </div>
      <div>
        <TextField
          id="creditos"
          label="Creditos"
          type='number'
          onChange={formik.handleChange}
          value={formik.values.creditos}
          fullWidth
        />
      </div>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
        </Box>
    )
  }
  

  export default FormCreate;