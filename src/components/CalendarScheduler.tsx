import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ModalInfosEventCalendar } from "./ModalInfosEventCalendar";
import { useDisclosure } from "../hooks/useDiscloure";
import { useState } from "react";
import { ContainerCalendar } from "./styles";
import { updateEventCalendar } from "../services/eventCalendarApi";
import { toast } from "react-toastify";
import { IEventCalendar } from "../domain/EventCalendar";

type CalendarSchedulerProps = {
  eventsCalendar: IEventCalendar[];
}

export const CalendarScheduler = ({eventsCalendar}: CalendarSchedulerProps) => {
  const [eventInfos, setEventInfos] = useState();
  const [isEditCard, setIsEditCard] = useState<boolean>(false);

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
          profesor: changeInfo.event.profesor.nombre,
          materia: changeInfo.event.materia.nombre,
          salon: changeInfo.event.salon.nombre,
        },
      };

      await updateEventCalendar(eventCalendarUpdated);
    } catch (err) {
      toast.error('Houve um erro ao atualizar o evento');
    }
  };

  const now = new Date();

  console.log(eventsCalendar);
  

  return (
  <ContainerCalendar>
      <ModalInfosEventCalendar
        open={modalInfosEvent.isOpen}
        handleClose={modalInfosEvent.handleClose}
        eventInfos={eventInfos}
        isEditCard={isEditCard}
      />

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
      initialEvents={eventsCalendar}
      // visibleRange={{ start: start, end: end }}
      longPressDelay={1000}
      eventLongPressDelay={1000}
      selectLongPressDelay={1000}
      selectable={true}
      dayMaxEvents={true}
      slotMinTime="07:00:00"
      slotMaxTime="22:00:00"
      allDaySlot={false}
      editable={true}
      height="700px"
      buttonText={{
        today: "Hoy",
        week: "Semana",
        day: "Dia",
        list: "Lista",
      }}
    />
  </ContainerCalendar>
  );
};
