import React, { useEffect } from 'react';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import SeleccionHorarios from '../../../ModalHorario';
import { getAllMaterias } from '../../../../services/materiasApi';

interface FormCreateProps {
  initialValues?: {
    _id?: string;
    nombre: string;
    fechaNacimiento: string;
    correoElectronico: string;
    numeroTelefono: string;
    tituloAcademico: string;
    materias: string[];
    disponibilidad: string[];
    salario: string;
    auxiliar: boolean;
  };
  onSubmit: (values: any) => void;
}

const FormCreate: React.FC<FormCreateProps> = ({ initialValues = {}, onSubmit }) => {
  const [materiasL, setMateriasL] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [horarios, setHorarios] = React.useState<string[]>(initialValues?.disponibilidad ? initialValues?.disponibilidad: []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMaterias = async () => {
    const materias = await getAllMaterias();
    setMateriasL(materias);
  };

  useEffect(() => {
    getMaterias();
  }, []);

  const formik = useFormik({
    initialValues: {
      nombre: initialValues.nombre || '',
      fechaNacimiento: initialValues.fechaNacimiento || '',
      correoElectronico: initialValues.correoElectronico || '',
      numeroTelefono: initialValues.numeroTelefono || '',
      tituloAcademico: initialValues.tituloAcademico || '',
      materias: initialValues.materias || [],
      salario: initialValues.salario || '',
      auxiliar: initialValues.auxiliar || false,
    },
    onSubmit: (values) => {
      // Puedes realizar alguna lógica adicional antes de llamar a la función onSubmit
      const valuesNew = {...values, disponibilidad: horarios}
      onSubmit(valuesNew);
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      // Puedes agregar lógica de validación aquí

      return errors;
    },
  });

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="nombre"
          label="Nombre"
          fullWidth
          sx={{ mb: 2 }}
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <TextField
          id="fechaNacimiento"
          label="Fecha de Nacimiento"
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          value={formik.values.fechaNacimiento}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <TextField
          id="correoElectronico"
          label="Correo Electrónico"
          type="email"
          fullWidth
          sx={{ mb: 2 }}
          value={formik.values.correoElectronico}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <TextField
          id="numeroTelefono"
          label="Número de Teléfono"
          type="tel"
          fullWidth
          sx={{ mb: 2 }}
          value={formik.values.numeroTelefono}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <TextField
          id="tituloAcademico"
          label="Título Académico"
          fullWidth
          sx={{ mb: 2 }}
          value={formik.values.tituloAcademico}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="materias-label">Materias</InputLabel>
          <Select
            id="materias"
            name="materias"
            label="Materias"
            multiple
            value={formik.values.materias}
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

        {/* <Button variant="outlined" onClick={handleOpen} sx={{ mb: 2 }}>
          Abrir disponibilidad Horaria
        </Button> */}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Seleccionar Horarios</DialogTitle>
          <DialogContent>
            <SeleccionHorarios 
              setHorarios={setHorarios} 
              horarios={horarios}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

        <TextField
          id="salario"
          label="Salario"
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          value={formik.values.salario}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <FormControlLabel
          control={
            <Checkbox
              id="auxiliar"
              name="auxiliar"
              checked={formik.values.auxiliar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          }
          label="Auxiliar"
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FormCreate;

