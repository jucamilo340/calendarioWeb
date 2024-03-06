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
`;