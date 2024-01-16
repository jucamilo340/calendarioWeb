import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ModalInfosEventCalendar } from "./ModalInfosEventCalendar";
import { useDisclosure } from "../hooks/useDiscloure";
import { useEffect, useState } from "react";
import { ContainerCalendar } from "./styles";
import { updateEventCalendar } from "../services/eventCalendarApi";
import { toast } from "react-toastify";
import { IEventCalendar } from "../domain/EventCalendar";
import { useGroupContext } from "../hooks/GroupContext";
import { getAllGrupos } from "../services/grupoApi";
import { Box, MenuItem, Select } from "@mui/material";

type CalendarSchedulerProps = {
  eventsCalendar: IEventCalendar[];
}

export const CalendarScheduler = ({eventsCalendar}: CalendarSchedulerProps) => {
  const [eventInfos, setEventInfos] = useState();
  const [isEditCard, setIsEditCard] = useState<boolean>(false);
  const [grupos, setGrupos] = useState([]);
  const { selectedGroup, setGlobalGroup } = useGroupContext();
  useEffect(() => {
  }, [selectedGroup]);  

  const weekends = {
    weekendsVisible: true,
    currentEvents: [],
  };

  const modalInfosEvent = useDisclosure(false);


  const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
    setIsEditCard(false);
    setEventInfos(selectInfo);
    modalInfosEvent.handleOpen();
  };

  const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
    setIsEditCard(true);
    setEventInfos(clickInfo);
    modalInfosEvent.handleOpen();
  };

  const handleUpdateEventSelect = async (changeInfo: any) => {
    try {
      const eventCalendarUpdated = {
        eventCalendar: {
          _id: changeInfo.event.id,
          title: changeInfo.event.title,
          start: changeInfo.event.startStr,
          end: changeInfo.event.endStr,
          backgroundColor: changeInfo.event.backgroundColor,
          textColor: changeInfo.event.textColor,
        },
      };

      await updateEventCalendar(eventCalendarUpdated);
    } catch (err) {
      toast.error('Hubo un error al actualizar la Clase');
    }
  };

  const getGrupos = async () => {
    const gruposAll = await getAllGrupos();
    setGlobalGroup(gruposAll[0]);
    setGrupos(gruposAll);
  };

  const now = new Date();

  const eventDisplay = (info:any) => {
    const startHour = new Date(info.event.start);
    const endHour = new Date(info.event.end);
    const horasFormatoStart = (startHour.getHours()).toString();
    const minutosFormatoStart = startHour.getMinutes().toString().padStart(2, '0');
    const horasFormatoEnd = (endHour.getHours()).toString();
    const minutosFormatoEnd = endHour.getMinutes().toString().padStart(2, '0');
    return(
     <div>
        <span>{`${horasFormatoStart}:${minutosFormatoStart} - ${horasFormatoEnd}:${minutosFormatoEnd}`}</span><br/>
        <span>Asignatura: {info?.event?._def?.extendedProps.materia.nombre}</span><br/>
        <span>Profesor: {info?.event?._def?.extendedProps.profesor.nombre}</span><br/>
        <span>Salon: {info?.event?._def?.extendedProps.salon.nombre}</span>
     </div>
    )
  }

  useEffect(() => {
      getGrupos();
  }, [])
  
  

  return (
  <ContainerCalendar>
      <ModalInfosEventCalendar
        open={modalInfosEvent.isOpen}
        handleClose={modalInfosEvent.handleClose}
        eventInfos={eventInfos}
        isEditCard={isEditCard}
      />
      <Box sx={{width: '100%', display:'flex', justifyContent: 'flex-start'}}>
        <Box>
          <Select
                labelId="grupos-label"
                id="grupos"
                name="grupos"
                label="Grupo"
                value={selectedGroup}
                onChange={(e: any) => {
                  setGlobalGroup(e?.target?.value);
                }}
              >
                {grupos.map((grupo: any) => (
                  <MenuItem key={grupo._id} value={grupo}>
                    {grupo.nombre} semestre {grupo.semestre} {grupo.diurno ? 'Diurno':'Nocturno'}
                  </MenuItem>
                ))}
            </Select>
        </Box>
      </Box>
    <FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      initialDate = '2018-01-12'
      headerToolbar={{
        // left: "prev,next today",
        left: "",
        center: "",
        right: "timeGridWeek,timeGridDay",
      }}
      // dayHeaderFormat="dom"
      dayHeaderFormat = {{ weekday: 'long' }}
      locale="es-br"
      dayHeaders={true}
      weekends={weekends.weekendsVisible}
      select={handleAddEventSelectAndOpenModal}
      eventClick={handleEditEventSelectAndOpenModal}
      eventChange={handleUpdateEventSelect}
      events={eventsCalendar}
      key={eventsCalendar.map(event => event.id).join(',')}
      // visibleRange={{ start: start, end: end }}
      longPressDelay={1000}
      eventLongPressDelay={1000}
      selectLongPressDelay={1000}
      selectable={true}
      eventDurationEditable={false}
      dayMaxEvents={true}
      slotMinTime="07:00:00"
      slotMaxTime="22:00:00"
      allDaySlot={false}
      editable={true}
      eventOverlap={false}
      height="700px"
      buttonText={{
        today: "Hoy",
        week: "Semana",
        day: "Dia",
        list: "Lista",
      }}
      eventContent= {eventDisplay}
    />
  </ContainerCalendar>
  );
};
