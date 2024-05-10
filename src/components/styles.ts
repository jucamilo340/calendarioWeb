import { styled } from '@mui/material/styles';

export const ContainerCalendar = styled('div')`
  @media (max-width: 768px) {
    .fc-toolbar.fc-header-toolbar {
      display: flex;
      flex-direction: column;
    }
  }
  .no-event-background {
    background-color: lightblue; /* Color de fondo para horas sin eventos */
  }
  @media print {
    body {
      display: flex;
      flex-direction: row;
    }
    #component1 {
      width: 50%; /* Ocupa la mitad del ancho de la página */
      overflow: hidden; /* Para evitar desbordamiento */
    }
  
    /* Agrega otros estilos específicos para impresión según sea necesario */
  }
`;