import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";

const FormCreate = () => {

    const initialValues = {
      nombre: '',
      fechaNacimiento: '',
      correoElectronico: '',
      numeroTelefono: '',
      tituloAcademico: '',
      materias: [],
      disponibilidad: [],
      salario: '',
      auxiliar: false,
    };
  
    const onSubmit = (values: any) => {
      // Add your form submission logic here
      console.log(values);
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
          id="fechaNacimiento"
          label="Fecha de Nacimiento"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.fechaNacimiento}
          fullWidth
        />
      </div>
      <div>
        <TextField
          id="correoElectronico"
          label="Correo Electrónico"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.correoElectronico}
          fullWidth
        />
      </div>
      <div>
        <TextField
          id="numeroTelefono"
          label="Número de Teléfono"
          type="tel"
          onChange={formik.handleChange}
          value={formik.values.numeroTelefono}
          fullWidth
        />
      </div>
      <div>
        <TextField
          id="tituloAcademico"
          label="Título Académico"
          onChange={formik.handleChange}
          value={formik.values.tituloAcademico}
          fullWidth
        />
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="materias-label">Materias</InputLabel>
          <Select
            id="materias"
            label="Materias"
            multiple
            onChange={formik.handleChange}
            value={formik.values.materias}
          >
            <MenuItem value={'materia1'}>Materia 1</MenuItem>
            <MenuItem value={'materia2'}>Materia 2</MenuItem>
            <MenuItem value={'materia3'}>Materia 3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="disponibilidad-label">Disponibilidad</InputLabel>
          <Select
            id="disponibilidad"
            label="Disponibilidad"
            multiple
            onChange={formik.handleChange}
            value={formik.values.disponibilidad}
          >
            <MenuItem value={'disponible1'}>Disponible 1</MenuItem>
            <MenuItem value={'disponible2'}>Disponible 2</MenuItem>
            <MenuItem value={'disponible3'}>Disponible 3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          id="salario"
          label="Salario"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.salario}
          fullWidth
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              id="auxiliar"
              name="auxiliar"
              checked={formik.values.auxiliar}
              onChange={formik.handleChange}
            />
          }
          label="Auxiliar"
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