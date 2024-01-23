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