import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ModalInfosEventCalendar } from "./ModalInfosEventCalendar";
import { useDisclosure } from "../hooks/useDiscloure";
import adaptivePlugin from '@fullcalendar/adaptive'
import { useEffect, useRef, useState } from "react";
import { ContainerCalendar } from "./styles";
import { deleteAllEventCalendar, generarHorario, updateDateEventCalendar } from "../services/eventCalendarApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IEventCalendar } from "../domain/EventCalendar";
import { useGroupContext } from "../hooks/GroupContext";
import { getAllGrupos } from "../services/grupoApi";
import { Box, MenuItem, Select, Button, Typography } from "@mui/material";
import { CircularProgress, Backdrop } from '@mui/material';
import { styled } from '@mui/system';
import { numeroAOrdinal } from "../constants/metodos";
import  { ModalFiltro }  from "../components/ModalFiltro/index";

const MyBackdrop = styled(Backdrop)({
  zIndex: 10,
  color: '#fff',
});


type CalendarSchedulerProps = {
  eventsCalendar: IEventCalendar[];
}


export const CalendarScheduler = ({eventsCalendar}: CalendarSchedulerProps) => {
  const [eventInfos, setEventInfos] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isEditCard, setIsEditCard] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [grupos, setGrupos] = useState([]);
  const calendarRef = useRef(null);
  const { selectedGroup, setGlobalGroup, fetchData, setfetchData } = useGroupContext();
  useEffect(() => {
  }, []);  

  const weekends = {
    weekendsVisible: true,
    currentEvents: [],
  };

  const modalInfosEvent = useDisclosure(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


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

      await updateDateEventCalendar(eventCalendarUpdated);
    } catch (err) {
      toast.error('Hubo un error al actualizar la Clase');
    }
  };

  const generarHorarioEventos = async () => {
    setLoading(true);
    try {
      await generarHorario(selectedGroup?._id);
      setfetchData(!fetchData);
      toast.success("Horario generado Exitosamente !", {
        position: "top-center"
      });
    } catch (error) {
      toast.error('Hubo un error al generar el horario',{
        position: "top-center"
      });
    } finally {
      setLoading(false);
    }
  };

  const eliminarHorarioEventos = async () => {
    try {
      await deleteAllEventCalendar(selectedGroup?._id);
      setfetchData(!fetchData);
      toast.success("Horario Eliminado Exitosamente", {
        position: "top-center"
      });
    } catch (error) {
      toast.error('Hubo un error al eliminar el horario',{
        position: "top-center"
      });
    }
  };

  const getGrupos = async () => {
    const gruposAll = await getAllGrupos();
    setGlobalGroup(gruposAll[0]);
    setGrupos(gruposAll);
  };
  const handlePrintCalendar = (cmpName) => {
    var docHead = document.head.outerHTML;
    var printContents = document?.getElementById('component1').outerHTML;
    var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

    var newWin = window.open("", "_blank", winAttr);
    var writeDoc = newWin.document;
    writeDoc.open();
    writeDoc.write('<!doctype html><html> <style>.fc-header-toolbar{display :none !important;} .fc-scroller.fc-scroller-liquid{overflow:visible !important;} .fc-view-harness.fc-view-harness-active{height:auto !important;}</style>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
    writeDoc.close();
    newWin.focus();
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
        {info.event.title === 'NaN' ?
     <div>
        <span>{`${horasFormatoStart}:${minutosFormatoStart} - ${horasFormatoEnd}:${minutosFormatoEnd}`}</span><br/>
        <span>Asignatura: {info?.event?._def?.extendedProps?.materia?.nombre}</span><br/>
        <span>Profesor: {info?.event?._def?.extendedProps?.profesor?.nombre}</span><br/>
        <span>Salon: {info?.event?._def?.extendedProps?.salon?.nombre}</span>
     </div>
     :
     <div>
        <span>{info.event.title}</span><br/>
     </div>}
      </div>
    )
  }

  useEffect(() => {
      getGrupos();
  }, []);

  const hasEventOnHour = (date: Date) => {
    const dateString = date.toISOString();
    return eventsCalendar.some(event => dateString >= event.start && dateString < event.end);
  };

  return (
  <ContainerCalendar>
        <MyBackdrop open={loading}>
        <Typography variant="h4" sx={{color: "white", marginRight:'10px'}}> Generando Horario</Typography> 
        <CircularProgress color="success" />
      </MyBackdrop>
      <div>
        <ToastContainer />
      </div>
            <ModalInfosEventCalendar
            open={modalInfosEvent.isOpen ? (!eventInfos?.event?.title ||eventInfos?.event?.title === 'NaN') : false}
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
                    Grupo:{grupo.nombre} -
                    Nivel:{grupo.semestre} - 
                    {/* {numeroAOrdinal(grupo.semestre)} semestre */}
                    {grupo.diurno ? 'Diurno':'Nocturno'}
                  </MenuItem>
                ))}
            </Select>
        </Box>
        <Button onClick={()=> generarHorarioEventos()} sx={{marginLeft: '50px'}} variant="contained" color="success">
          Generar Calendario
        </Button>
        <Button onClick={()=> eliminarHorarioEventos()} sx={{marginLeft: '50px'}} variant="contained" color="error">
          Eliminar Horario
        </Button>
        <Button onClick={()=>handlePrintCalendar('component1')} sx={{marginLeft: '50px'}} variant="contained" color="primary">
          Imprimir Horario
        </Button>
        <Button onClick={()=>handleOpenModal()} sx={{marginLeft: '50px'}} variant="contained" color="primary">
          Abrir Filtros
        </Button>
      </Box>
    <Box id="component1" sx={{width: '100%', height: '100%'}}>
    <FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, adaptivePlugin]}
      initialView="timeGridWeek"
      ref={calendarRef}
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
      // slotLaneContent={({ date }) => {const isEventHour = hasEventOnHour(date);
      //   const className = isEventHour ? '' : 'no-event-background';
      //   return <div style={{height: '100%'}} className={className}></div>;
      // }}
      // slotLabelFormat={{
      //   hour: 'numeric',
      //   minute: '2-digit',
      //   meridiem: 'short'
      // }}
      height="700px"
      buttonText={{
        today: "Hoy",
        week: "Semana",
        day: "Dia",
        list: "Lista",
      }}
      eventContent= {eventDisplay}
    />
    <ModalFiltro open={openModal} onClose={handleCloseModal} />
    </Box>
  </ContainerCalendar>
  );
};
