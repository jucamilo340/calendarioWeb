import moment from "moment";

export const Horarios: string[] = [
    "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
  ];
  

  export function numeroAOrdinal(numero: number): string {
    const ordinales = ['primer', 'segundo', 'tercer', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno', 'décimo'];
  
    if (numero >= 1 && numero <= 10) {
      return ordinales[numero - 1];
    } else {
      return 'Número no admitido';
    }
  }

  export const updateBusinessHours = (ocupacion:any, event: any) => {
    const daysOfWeek:any = {
      'lunes': 1,
      'martes': 2,
      'miércoles': 3,
      'jueves': 4,
      'viernes': 5,
      'sábado': 6,
      'domingo': 0
    };

    let newBusinessHours = ocupacion.map((slot:any) => {
      const day = daysOfWeek[slot.dia.toLowerCase()];
      return {
        daysOfWeek: [day],
        startTime: slot.inicio,
        endTime: slot.fin,
      };
    });
    const startTime = event.start;
    const endTime = event.end;
    const eventHours = {
      daysOfWeek: [startTime.getDay()],
      startTime: `${moment(startTime).format('HH:mm')}`,
      endTime: `${moment(endTime).format('HH:mm')}`,
    }
     const updatedSchedule = newBusinessHours.filter((item:any) => 
       !(item.daysOfWeek[0] === eventHours.daysOfWeek[0] &&
         item.startTime === eventHours.startTime &&
         item.endTime === eventHours.endTime)
     );
     console.log(updatedSchedule);
    return updatedSchedule;
  };