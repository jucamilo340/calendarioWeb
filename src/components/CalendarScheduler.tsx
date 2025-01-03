// @ts-nocheck
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
import { Box, MenuItem, Select, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert } from "@mui/material";
import { CircularProgress, Backdrop } from '@mui/material';
import { styled } from '@mui/system';
import { updateBusinessHours } from "../constants/metodos";
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import  { ModalFiltro }  from "../components/ModalFiltro/index";
import { ModalReport } from "./ModalReport";
import { getAllPlanes } from "../services/planApi";
import { ModalConfig } from "./ModalConfig";

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
  const [accionLoad, setaccionLoad] = useState('Generando Horario');
  const [openReport, setOpenReport] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);
  const [isEditCard, setIsEditCard] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [businessHours, setBusinessHours] = useState<any>([]);
  const [grupos, setGrupos] = useState([]);
  const calendarRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleYes = async () => {
    if(accionLoad === 'eliminar horario'){
      await eliminarHorarioEventos();
      setShowAlert(false);
      return;
    }
    if(accionLoad === 'Cargar datos'){
      await generarHorarioEventos('crear');
      window.location.reload();
      setShowAlert(false);
      return;
    }
    if(accionLoad === 'Generando Horario'){
      await generarHorarioEventos('generar');
      
      return;
    }
    if(accionLoad === 'Eliminar data'){
      await generarHorarioEventos('borrar');
      window.location.reload();
      return;
    }
  };

  const handleNo = () => {
    setShowAlert(false);
  };
  const { selectedGroup, setGlobalGroup, setSelectedPlan, selectedPlan, fetchGroup, setfetchGroup, fetchData, setfetchData } = useGroupContext();
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

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const handleOpenConfig = () => {
    setOpenConfig(true);
  };

  const handleCloseConfig = () => {
    setOpenConfig(false);
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
      setfetchData(!fetchData);
    } catch (err: any) {
      changeInfo.revert();
      toast.error(err?.response?.data?.message || 'Hubo un error al actualizar el evento');
    }
  };
  

  const generarHorarioEventos = async (accion: string) => {
    setShowAlert(false);
    setLoading(true);
    try {
      await generarHorario(selectedGroup?._id, accion);
      setfetchData(!fetchData);
      setLoading(false);
      toast.success("Horario generado Exitosamente !", {
        position: "top-center"
      });
    } catch (error:any) {
      //  if(accion === 'crear'){
      //    const fiftyMinutes = 100 * 60 * 1000;
      //  setTimeout(() => {
      //    setLoading(false);
      //    toast.success("Carga de datos exitosa!", {
      //      position: "top-center"
      //    });
      //    window.location.reload();
      //    return;
      //  }, fiftyMinutes);
      //  }else {
        if(error?.response?.data?.message === "Hay materias sin profesor asignado"){
          setLoading(false);
          toast.error('Hay materias sin profesor asignado',{
            position: "top-center"
          });
        }
        setLoading(false);
        toast.error('a ocurrido un error',{
          position: "top-center"
        });
       //}
    }
  };

  const handleEventDragStop = (info:any) => {
    setBusinessHours([]);
    let profesor : any = [];
    const noHours = (info?.event?.extendedProps?.profesor?.ocupacion.concat(info?.event?.extendedProps?.salon?.ocupacion).length - 2) === 0;
    if(!info.event.extendedProps.profesor || noHours){
      profesor = info.event.extendedProps.salon.ocupacion;
      if((info.event.extendedProps.salon.ocupacion.length - 1) === 0){
        removeRedClassFromNonBusinessHours(false);
      }else{
        removeRedClassFromNonBusinessHours(true);
      }
    }else{
      profesor = info.event.extendedProps.profesor.ocupacion.concat(info.event.extendedProps.salon.ocupacion);
      removeRedClassFromNonBusinessHours(true);
    }
  };

  const handleEventDragStart = (info:any) => {
    let profesor : any = [];
    const noHours = (info?.event?.extendedProps?.profesor?.ocupacion.concat(info?.event?.extendedProps?.salon?.ocupacion).length - 2) === 0;
    if(!info.event.extendedProps.profesor || noHours){
      profesor = info.event.extendedProps.salon.ocupacion;
      if((info.event.extendedProps.salon.ocupacion.length - 1) === 0){
        addRedClassToNonBusinessHours(false);
      }else{
        addRedClassToNonBusinessHours(true);
      }
    }else{
      profesor = info.event.extendedProps.profesor.ocupacion.concat(info.event.extendedProps.salon.ocupacion);
      addRedClassToNonBusinessHours(true);
    }
    const updateHours = updateBusinessHours(profesor, info?.event);
      setBusinessHours(updateHours)
  };

  const addRedClassToNonBusinessHours = (profesor:boolean) => {
    const timeGridEl = document.querySelector('.fc-timegrid');
    if (timeGridEl) {
      const timeSlots = timeGridEl.querySelectorAll('.fc-timegrid-slot');
      timeSlots.forEach(slot => {
        if (!slot.classList.contains('fc-non-business')) {
          slot.classList.add(profesor ? 'fc-red-hours' : 'fc-green-hours');
        }
      });
    }
  };

  const removeRedClassFromNonBusinessHours = (profesor:boolean) => {
    const timeGridEl = document.querySelector('.fc-timegrid');
    if (timeGridEl) {
      const timeSlots = timeGridEl.querySelectorAll('.fc-timegrid-slot');
      timeSlots.forEach(slot => {
        slot.classList.remove(profesor ? 'fc-red-hours' : 'fc-green-hours');
      });
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

  const getPlanes = async () => {
    try {
      const response = await getAllPlanes();
      setSelectedPlan(response[0]);
    } catch (error) {
      console.error('Error fetching planes:', error);
    }
  };
  
  const handlePrintCalendar = async () => {
    const calendarElement = document.getElementById('component1');
    const winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no, dependent=no, width=1083, height=830, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";
  
    if (calendarElement) {
      const cloneContainer = document.createElement('div');
      cloneContainer.style.position = 'absolute';
      cloneContainer.style.left = '-9999px'; // Mover fuera de la vista del usuario
      document.body.appendChild(cloneContainer);
  
      // Clonar el contenido y ajustar los estilos para impresión
      const clonedCalendar: any = calendarElement.cloneNode(true);
      clonedCalendar.style.width = '100%';
      clonedCalendar.style.height = 'auto';
      clonedCalendar.style.overflow = 'visible'; // Permitir que todo el contenido sea visible
  
      // Buscar y ajustar estilos en el contenido clonado
      const mediaScreenDiv = clonedCalendar.querySelector('.fc-media-screen');
      if (mediaScreenDiv) {
        mediaScreenDiv.style.height = '80vh'; // Establecer altura al 100vh
        mediaScreenDiv.style.width = '300vh';
      }
  
      cloneContainer.appendChild(clonedCalendar);
  
      // Esperar un breve momento para asegurar que el contenido se renderice completamente
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      const printContents = cloneContainer.innerHTML;
      const newWin = window.open("", "_blank", winAttr);
      const writeDoc = newWin?.document;
      const docHead = document.head.outerHTML;
  
      if (writeDoc) {
        writeDoc.open();
        writeDoc.write(
          `<!doctype html><html>
          <head>
            <style>
              @media print {
                @page {
                  size: landscape; /* Orientación horizontal (paisaje) */
                }
                body {
                  width: 100vw; /* Ancho completo de la ventana de visualización */
                  height: auto; /* Altura automática */
                  margin: 0; /* Eliminar márgenes */
                  padding: 0; /* Eliminar relleno */
                }
              }
            </style>
            ${docHead} <!-- Incluir el encabezado del documento original -->
          </head>
          <body onLoad="window.print()">
            ${printContents} <!-- Incluir el contenido del calendario clonado -->
          </body>
          </html>`
        );
  
        writeDoc.close();
        newWin?.focus();
      }
  
      // Eliminar el contenedor clonado después de imprimir
      document.body.removeChild(cloneContainer);
    }
  };

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
        <span>Profesor: {info?.event?._def?.extendedProps?.profesor ? info?.event?._def?.extendedProps?.profesor?.nombre : 'Sin Asignar'}</span><br/>
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
      getPlanes();
  }, [fetchGroup]);

  const hasEventOnHour = (date: Date) => {
    const dateString = date.toISOString();
    return eventsCalendar.some(event => dateString >= event.start && dateString < event.end);
  };

  return (
  <ContainerCalendar>
        <MyBackdrop open={loading}>
        <Typography variant="h4" sx={{color: "white", marginRight:'10px'}}> {accionLoad}</Typography> 
        <CircularProgress color="success" />
      </MyBackdrop>
      <div>
        <ToastContainer />
      </div>
            <ModalInfosEventCalendar
            open={modalInfosEvent.isOpen ? ((!eventInfos?.event?.title) || (eventInfos?.event?.title === 'NaN')) : false}
            handleClose={modalInfosEvent.handleClose}
            eventInfos={eventInfos}
            isEditCard={isEditCard}
      />
      <Box sx={{width: '100%', display:'flex', justifyContent: 'flex-start'}}>
        <Box sx={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        <Typography variant="h6" sx={{color: "black", textAlign: 'start', marginLeft: 0.5}}> Grupos</Typography> 
          <Select
                labelId="grupos-label"
                id="grupos"
                name="grupos"
                label="Grupo"
                style={{color: 'black'}}
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
        <Button onClick={()=>{setaccionLoad('Generando Horario'); setShowAlert(true);}} sx={{marginLeft: '50px'}} variant="contained" color="success">
          Generar Calendario
        </Button>
        <Button onClick={()=> {setaccionLoad('eliminar horario'); setShowAlert(true);}} sx={{marginLeft: '50px'}} variant="contained" color="error">
          Eliminar Horario
        </Button>
        <Button onClick={handlePrintCalendar} sx={{marginLeft: '50px'}} variant="contained" color="primary">
          Imprimir Horario
        </Button>
        <Button onClick={()=>handleOpenModal()} sx={{marginLeft: '50px'}} variant="contained" color="primary">
          Abrir Filtros
        </Button>
        <Button onClick={async ()=> { setaccionLoad('Cargar datos'); setShowAlert(true);} } sx={{marginLeft: '50px'}} variant="contained" color="warning">
          Cargar DB
        </Button>
        <Button onClick={async ()=> { setaccionLoad('Eliminar data'); setShowAlert(true);}} sx={{marginLeft: '50px'}} variant="contained" color="error">
          Borrar Data
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
      slotMaxTime="23:00:00"
      allDaySlot={false}
      editable={true}
      eventOverlap={false}
      // slotLabelFormat={{
      //   hour: 'numeric',
      //   minute: '2-digit',
      //   meridiem: 'short'
      // }}
      businessHours =  {businessHours}
      eventDragStart={handleEventDragStart}
      eventDragStop={handleEventDragStop}
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
    <ModalReport open={openReport} onClose={handleCloseReport} />
    <ModalConfig open={openConfig} onClose={handleCloseConfig} />
    <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
        <DialogTitle>¿Estás seguro de {accionLoad === 'Generando Horario' ? 'Generar un Horario para este Grupo' : accionLoad === 'Cargar datos' ? 'Cargar datos este proceso eliminara la data actual y puede tardar demasiado (2 horas)' : accionLoad}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción no se puede deshacer. ¿Deseas continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAlert(false)} color="secondary">
            No
          </Button>
          <Button onClick={handleYes} color="primary" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  </ContainerCalendar>
  );
};
