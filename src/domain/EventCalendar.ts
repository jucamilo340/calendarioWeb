export interface IEventCalendar {
  _id: string;
  id?: string;
  title: string;
  end: string;
  start: string;
  profesor: any;
  materia: any;
  grupo:any
  salon: any;
  user: string;
}

export const mapEventCalendar = (eventCalendar: IEventCalendar) => ({
  ...eventCalendar,
  id: eventCalendar?._id,
});

export const mapArrayEventCalendar = (listEventsCalendar: IEventCalendar[]) => {
  const listEventsCalendarFormated = listEventsCalendar.map((eventCalendar) => mapEventCalendar(eventCalendar));

  return listEventsCalendarFormated;
};
