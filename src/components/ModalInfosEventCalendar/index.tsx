import { Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import { CalendarApi } from '@fullcalendar/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ColorsCard, ListColorsCard } from '../../constants/ListColorsCard';
import {
  createEventCalendar,
  deleteEventCalendar,
  updateEventCalendar,
} from '../../services/eventCalendarApi';
import { BackgroundColorRounded, BoxContainer, SelectColors } from './styles';
import { getAllProfesores } from '../../services/profesorCalendarApi';
import { getAllSalones } from '../../services/salonesApi';
import { getAllMaterias } from '../../services/materiasApi';

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

  useEffect(() => {
    if (isEditCard) {
      setTitle(eventInfos?.event?.title);
      setCardColor({
        backgroundColor: eventInfos?.event?.backgroundColor,
        textColor: eventInfos?.event?.textColor,
      });
    } else {
      setTitle('');
      setCardColor({backgroundColor: '#039be5', textColor: '#ffffff'});
    }
  }, [eventInfos, isEditCard]);

  const handleSelectCardColor = (color: ColorsCard) => {
    setCardColor({
      backgroundColor: color.backgroundColor,
      textColor: color.textColor,
    });
  };

  const [materias, setmaterias] = useState([]);
  const [selectMateria, setselectMateria] = useState('')

  const [profesores, setprofesores] = useState([]);
  const [selectProfesor, setselectProfesor] = useState('');

  const getMaterias = async () => {
    const materiasAll = await getAllMaterias();
    setmaterias(materiasAll);
  };

  const getProfesores = async () => {
    const profesoresAll = await getAllProfesores();
    setprofesores(profesoresAll);
  };

  const [salones, setsalones] = useState([]);
  const [selectSalon, setselectSalon] = useState('')

  const getSalones = async () => {
    const salonesAll = await getAllSalones();
    setsalones(salonesAll);
  };


  useEffect(() => {
    getProfesores();
    getSalones();
    getMaterias();
  }, [open]);
  

  const handleAddedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar;

      const eventCalendar = await createEventCalendar({
        eventCalendar: {
          title: title === '' ? 'Sem título' : title,
          start: eventInfos.startStr,
          end: eventInfos.endStr,
          backgroundColor: cardColor.backgroundColor,
          textColor: cardColor.textColor,
        },
      });

      calendarApi.addEvent({
        id: eventCalendar._id,
        title: eventCalendar.title,
        start: eventCalendar.start,
        end: eventCalendar.endStr,
        backgroundColor: cardColor.backgroundColor,
        textColor: cardColor.textColor,
      });
    } catch (err) {
      toast.error('Hubo un Error al crear las materia');
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
      toast.error('Houve um erro ao deletar o evento');
    } finally {
      setTitle('');
      handleClose();
    }
  };

  const handleUpdatedEvent = async () => {
    try {
      const calendarApi: CalendarApi = eventInfos.view.calendar;

      const eventCalendarUpdated = {
        eventCalendar: {
          _id: eventInfos.event.id,
          title: title !== '' ? title : 'Sem título',
          start: eventInfos.event.startStr,
          end: eventInfos.event.endStr,
          backgroundColor: cardColor.backgroundColor,
          textColor: cardColor.textColor,
        },
      };

      const currentEvent = calendarApi.getEventById(eventInfos.event.id);

      if (currentEvent) {
        currentEvent.setProp('title', title !== '' ? title : 'Sem título');
        currentEvent.setProp('backgroundColor', cardColor.backgroundColor);
        currentEvent.setProp('textColor', cardColor.textColor);
      }

      await updateEventCalendar(eventCalendarUpdated);
    } catch (error) {
      toast.error('Houve um erro ao atualizar o evento');
    } finally {
      setTitle('');
      handleClose();
    }
  };
  console.log(selectProfesor);
  return (
    <Modal open={open} onClose={handleClose}>
      <BoxContainer>
        <TextField label={'Adicionar título'} value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="materias-label">Materia</InputLabel>
          <Select
            labelId="materias-label"
            id="materias"
            name="materias"
            label="Materia"
            value={selectMateria}
            onChange={(e:any) => setselectMateria(e?.target?.value)}
          >
            {materias.map((materia: any) => (
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
            onChange={(e:any) => setselectProfesor(e?.target?.value)}
          >
            {profesores.map((profesor: any) => (
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
            onChange={(e:any) => setselectSalon(e?.target?.value)}
          >
            {salones.map((salon: any) => (
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
          {isEditCard ? 'Atualizar evento' : 'Adicionar evento'}
        </Button>

        {isEditCard && (
          <Button variant="contained" fullWidth sx={{ marginTop: '0.5rem' }} onClick={handleDeleteEvent}>
            Excluir evento
          </Button>
        )}
      </BoxContainer>
    </Modal>
  );
};