// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FormCreate from "./FormCreate";
import {
  getAllProfesores,
  createProfesor,
  updateProfesor,
  deleteProfesor,
} from "../../../../services/profesorCalendarApi";
import Horario from "./Calendar";
import { toast } from "react-toastify";

const ProfesoresList: React.FC = () => {
  interface Profesor {
    _id: string;
    nombre: string;
    ocupacion: string[];
  }

  const initialValues = {
    nombre: "",
    fechaNacimiento: "",
    correoElectronico: "",
    numeroTelefono: "",
    tituloAcademico: "",
    materias: [],
    disponibilidad: [],
    salario: "",
    tipo: "",
    auxiliar: false,
  };

  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [selectedProfesor, setSelectedProfesor] = useState<Profesor | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [showCalendar, setshowCalendar] = useState(false);
  const [calendarNow, setcalendarNow] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProfesores = async () => {
    const response = await getAllProfesores();
    setProfesores(response);
  };

  useEffect(() => {
    getProfesores();
  }, []);

  const handleEdit = (profesor: Profesor) => {
    setSelectedProfesor(profesor);
    handleOpen();
  };

  const handleDelete = async (id: string) => {
    await deleteProfesor({ id });
    getProfesores();
  };

  const handleSave = async (values: any) => {
    if (selectedProfesor) {
      // Editar profesor existente
      await updateProfesor({
        profesor: { _id: selectedProfesor._id, ...values },
      });
    } else {
      // Crear nuevo profesor
      try { 
        await createProfesor({ profesor: values });
      } catch (error) {
        toast.error(error?.response?.data?.message,{
          position: "top-center"
        });
      }
    }

    getProfesores();
    setSelectedProfesor(null);
    handleClose();
  };

  const getColorClass = (horasAsignadas, tipoProfesor) => {
    if (
      (tipoProfesor === "catedratico" &&
        (horasAsignadas < 8 || horasAsignadas > 16)) ||
      ((tipoProfesor === "carrera" || tipoProfesor === "contrato") &&
        (horasAsignadas < 12 || horasAsignadas > 16))
    ) {
      return "red";
    }
    return "green";
  };
  return (
    <Box
      mt={4}
      mx="auto"
      p={3}
      bgcolor="background.paper"
      boxShadow={3}
      maxWidth={800}
    >
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" mr={4}>
          <Box
            sx={{
              width: 24,
              height: 24,
              backgroundColor: "red",
              marginRight: 2,
            }}
          />
          <Typography variant="body1">
            Faltan horas por asignar faltantes
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: 24,
              height: 24,
              backgroundColor: "yellow",
              marginRight: 2,
            }}
          />
          <Typography variant="body1">Horas del profesor excedidas</Typography>
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "20%" }}>Cedula</TableCell>
              <TableCell style={{ width: "20%" }}>Nombre</TableCell>
              <TableCell style={{ width: "20%" }}>Horas Asignadas</TableCell>
              <TableCell style={{ width: "20%" }}>Horarios</TableCell>
              <TableCell style={{ width: "20%" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <div style={{ maxHeight: 400, overflow: "auto" }}>
        <TableContainer>
          <Table>
            <TableBody>
              {profesores.map((profesor) => (
                <TableRow key={profesor._id}>
                  <TableCell style={{ width: "20%" }}>
                    {profesor?.cedula}
                  </TableCell>
                  <TableCell style={{ width: "20%" }}>
                    {profesor.nombre}
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: getColorClass(
                        profesor.horasAsignadas,
                        profesor.tipo
                      ),
                    }}
                  >
                    {profesor.horasAsignadas}
                  </TableCell>
                  <TableCell style={{ width: "20%" }}>
                    <Button
                      onClick={() => {
                        setcalendarNow(profesor?.ocupacion);
                        setshowCalendar(true);
                      }}
                      variant="contained"
                      color="success"
                      mt={2}
                    >
                      Ver Horario
                    </Button>
                  </TableCell>
                  <TableCell style={{ width: "20%" }}>
                    <Button
                      onClick={() => handleEdit(profesor)}
                      color="primary"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(profesor._id)}
                      color="error"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Button onClick={handleOpen} variant="contained" color="success" mt={2}>
        Nuevo Profesor
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProfesor ? "Editar Profesor" : "Nuevo Profesor"}
        </DialogTitle>
        <DialogContent>
          <FormCreate
            initialValues={selectedProfesor || initialValues}
            onSubmit={handleSave}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={showCalendar}
        onClose={() => setshowCalendar(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Calendario del profesor</DialogTitle>
        <DialogContent>
          <Horario eventos={calendarNow} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProfesoresList;
