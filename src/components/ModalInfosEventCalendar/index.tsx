import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { CalendarApi } from '@fullcalendar/react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import moment from 'moment';
import {
  createEventCalendar,
  deleteEventCalendar,
  updateEventCalendar,
} from '../../services/eventCalendarApi';
import { getAllProfesores } from '../../services/profesorCalendarApi';
import { getAllSalones } from '../../services/salonesApi';
import { getAllMaterias } from '../../services/materiasApi';
import { ColorsCard, ListColorsCard } from '../../constants/ListColorsCard';
import { BackgroundColorRounded, BoxContainer, SelectColors } from './styles';
import { useGroupContext } from '../../hooks/GroupContext';

interface ICardColor {
  backgroundColor: string;
  textColor: string;
}

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose: () => void;
  eventInfos: any;
  isEditCard: boolean;
}

export const ModalInfosEventCalendar = ({
  handleClose,
  open,
  eventInfos,
  isEditCard,
}: IModalInfosEventCalendaryProps) => {
  const [title, setTitle] = useState<string>('');
  const [cardColor, setCardColor] = useState<ICardColor>({
    backgroundColor: '#039be5',
    textColor: '#ffffff',
  });


  const [materias, setMaterias] = useState([]);
  const [selectMateria, setSelectMateria] = useState<any>('');

  const [profesores, setProfesores] = useState([]);
  const [selectProfesor, setSelectProfesor] = useState<any>('');

  const [salones, setSalones] = useState([]);
  const [selectSalon, setSelectSalon] = useState<any>('');
  const { selectedGroup } = useGroupContext();

  useEffect(() => {
    setSalones([]);
    setSelectSalon('');
    setSelectProfesor('');
    setProfesores([]);
  }, [open])
  
  

  const inicioT = isEditCard ? eventInfos?.event?.startStr : eventInfos?.startStr;
  const finT = isEditCard ? eventInfos?.event?.startStr : eventInfos?.startStr;

  useEffect(() => {
    if(selectedGroup?.semestre){
      getMaterias();
    }
    if (isEditCard) {
      setTitle(eventInfos?.event?.title);
      setCardColor({
        backgroundColor: eventInfos?.event?.backgroundColor,
        textColor: eventInfos?.event?.textColor,
      });
    } else {
      setTitle('');
      setCardColor({ backgroundColor: '#039be5', textColor: '#ffffff' });
    }
  }, [eventInfos, isEditCard, selectedGroup]);


  const handleSelectCardColor = (color: ColorsCard) => {
    setCardColor({
      backgroundColor: color.backgroundColor,
      textColor: color.textColor,
    });
  };

  const getMaterias = async () => {
    const materiasAll = await getAllMaterias(selectedGroup?.semestre);
    setMaterias(materiasAll);
    if (isEditCard) {
      const materia = materiasAll.find((m:any)=> m._id === eventInfos?.event?._def?.extendedProps?.materia._id);
      setSelectMateria(materia);
      getProfesores(materia);
      getSalones(materia);
    }
  };

  const getProfesores = async (materia: any) => {
    const profesoresAll = await getAllProfesores({ materiaId: materia._id, horario: {inicio: inicioT,
      fin: finT}, eventoId: eventInfos?.event?.id });
    setProfesores(profesoresAll);
    if (isEditCard) {
      const profesor = profesoresAll.find((m:any)=> m._id === eventInfos?.event?._def?.extendedProps?.profesor._id);
      setSelectProfesor(profesor);
    }
  };

  const getSalones = async (materia:any) => {
    const salonesAll = await getAllSalones({horario: {inicio: inicioT,
      fin: finT}, eventoId: eventInfos?.event?.id, tipoSalon: materia.tipoSalon });
    setSalones(salonesAll);
    if (isEditCard) {
      const salon = salonesAll.find((m:any)=> m._id === eventInfos?.event?._def?.extendedProps?.salon._id);
      setSelectSalon(salon);
    }
  };

  const handleAddedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar;
      const nuevaHoraFinal= moment(inicioT).add(selectMateria?.horas, 'hours').format("YYYY-MM-DDTHH:mm:ssZ");
      const eventCalendar = await createEventCalendar({
        eventCalendar: {
          title: title === '' ? 'NaN' : title,
          start: eventInfos.startStr,
          end: nuevaHoraFinal,
          backgroundColor: cardColor.backgroundColor,
          textColor: cardColor.textColor,
          profesor: selectProfesor._id,
          materia: selectMateria._id,
          salon: selectSalon._id,
          grupo: selectedGroup._id,
        },
      });

      calendarApi.addEvent({
        id: eventCalendar._id,
        title: eventCalendar.title,
        start: eventCalendar.start,
        end: eventCalendar.end,
        backgroundColor: cardColor.backgroundColor,
        textColor: cardColor.textColor,
        profesor: selectProfesor,
        materia: selectMateria,
        salon: selectSalon,
      });
    } catch (err) {
      toast.error('Hubo un error al crear la clase');
    } finally {
      setTitle('');
      handleClose();
    }
  };
  const handleDeleteEvent = async () => {
    try {
      await deleteEventCalendar({ id: eventInfos.event.id });
      eventInfos.event.remove();
    } catch (error) {
      toast.error('Hubo un error al eliminar la clase');
    } finally {
      setTitle('');
      handleClose();
    }
  };

  const handleUpdatedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar;
      const nuevaHoraFinal= moment(inicioT).add(selectMateria?.horas, 'hours').format("YYYY-MM-DDTHH:mm:ssZ");
      const eventCalendarUpdated = {
        eventCalendar: {
          _id: eventInfos.event.id,
          title: 'Sin título',
          start: eventInfos.event.startStr,
          end: nuevaHoraFinal,
          backgroundColor: cardColor.backgroundColor,
          textColor: cardColor.textColor,
          profesor: selectProfesor._id,
          materia: selectMateria._id,
          salon: selectSalon._id,
        },
      };

      const currentEvent = calendarApi.getEventById(eventInfos?.event?.id); 

      if (currentEvent) {
        currentEvent.setProp('title', title !== '' ? title : 'NaN');
        currentEvent.setProp('backgroundColor', cardColor.backgroundColor);
        currentEvent.setProp('textColor', cardColor.textColor);
        currentEvent.setProp('end', nuevaHoraFinal);
        currentEvent.setExtendedProp('profesor', selectProfesor);
        currentEvent.setExtendedProp('materia', selectMateria);
        currentEvent.setExtendedProp('salon', selectSalon);
      }
      await updateEventCalendar(eventCalendarUpdated);
      toast.success('Clase actualizada correctamente');
    } catch (error) {
      toast.error('Hubo un error al actualizar la clase');
    } finally {
      setTitle('');
      handleClose();
    }
  };

  

  return (
    <Modal open={open} onClose={handleClose}>
      <BoxContainer>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="materias-label">Materia</InputLabel>
          <Select
            labelId="materias-label"
            id="materias"
            name="materias"
            label="Materia"
            value={selectMateria}
            onChange={(e: any) => {
              getProfesores(e?.target?.value);
              getSalones(e?.target?.value);
              setSelectMateria(e?.target?.value);
            }}
          >
            {materias?.map((materia: any) => (
              <MenuItem key={materia._id} value={materia}>
                {materia.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="profesores-label">Profesor</InputLabel>
          <Select
            labelId="profesores-label"
            id="profesores"
            name="profesores"
            label="Profesor"
            value={selectProfesor}
            onChange={(e: any) => setSelectProfesor(e?.target?.value)}
          >
            {profesores?.map((profesor: any) => (
              <MenuItem key={profesor._id} value={profesor}>
                {profesor.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="salones-label">Salon</InputLabel>
          <Select
            labelId="salon-label"
            id="salones"
            name="salones"
            label="Salon"
            value={selectSalon}
            onChange={(e: any) => setSelectSalon(e?.target?.value)}
          >
            {salones?.map((salon: any) => (
              <MenuItem key={salon._id} value={salon}>
                {salon.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <SelectColors>
          {ListColorsCard.map((color, index) => (
            <BackgroundColorRounded
              key={index}
              selected={false}
              color={color.backgroundColor}
              onClick={() => handleSelectCardColor(color)}
            >
              <input
                type="radio"
                name="cardColor"
                checked={color.backgroundColor === cardColor.backgroundColor}
              />
            </BackgroundColorRounded>
          ))}
        </SelectColors>

        <Button
          variant="contained"
          fullWidth
          onClick={isEditCard ? handleUpdatedEvent : handleAddedEvent}
          sx={{ marginTop: '0.5rem' }}
        >
          {isEditCard ? 'Actualizar Clase' : 'Crear Clase'}
        </Button>

        {isEditCard && (
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: '0.5rem' }}
            onClick={handleDeleteEvent}
          >
            Eliminar Clase
          </Button>
        )}
      </BoxContainer>
    </Modal>
  );
};
