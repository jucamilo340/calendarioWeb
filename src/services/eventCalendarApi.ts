import api from './api';
import {
  CREATE_EVENT_CALENDAR,
  DELETE_EVENT_CALENDAR,
  GET_ALL_EVENTS_CALENDAR,
  UPDATE_EVENT_CALENDAR,
  GENERATE_EVENT_CALENDAR,
  DELETE_ALL_EVENT_CALENDAR,
  UPDATE_DATE_EVENT_CALENDAR
} from './Routes';

interface ICreateEventCalendar {
  eventCalendar: {
    title: string;
    end: string;
    start: string;
    profesor: string;
    grupo: string;
    materia: string,
    salon: string;
    backgroundColor: string;
    textColor: string;
  };
}

export const createEventCalendar = async (data: ICreateEventCalendar) => {
  try {
    const response = await api.post(CREATE_EVENT_CALENDAR, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllEventsCalendar = async (grupoId:string, filtros:any) => {
  try {
    const params: Record<string, string> = {};
    if (grupoId) {
      params.grupoId = grupoId;
    }
    if (filtros) {
      params.filtros = filtros;
    }
    const response = await api.get(GET_ALL_EVENTS_CALENDAR,{ params });
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IUpdateEventCalendar {
  eventCalendar: {
    _id: string;
    title: string;
    end: string;
    start: string;
    profesor: string;
    materia: string,
    salon: string;
    backgroundColor: string;
    textColor: string;
  };
}

interface IUpdateDateEventCalendar {
  eventCalendar: {
    _id: string;
    title: string;
    end: string;
    start: string;
    backgroundColor: string;
    textColor: string;
  };
}

export const updateEventCalendar = async (data: IUpdateEventCalendar) => {
  try {
    console.log('entraaa 1');
    const response = await api.put(UPDATE_EVENT_CALENDAR, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const updateDateEventCalendar = async (data: IUpdateDateEventCalendar) => {
  console.log('entraaa 2');
    const response = await api.put(UPDATE_DATE_EVENT_CALENDAR, data);
    return response.data;
};

interface IDeleteEventCalendar {
  id: string;
}

export const deleteEventCalendar = async ({ id }: IDeleteEventCalendar) => {
  try {
    const response = await api.delete(DELETE_EVENT_CALENDAR(id));
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteAllEventCalendar = async (id:string) => {
  try {
    const response = await api.delete(DELETE_ALL_EVENT_CALENDAR(id));
    return response.data;
  } catch (err) {
    return err;
  }
};

export const generarHorario = async (id:string) => {
    const response = await api.post(GENERATE_EVENT_CALENDAR(id));
    return response.data;
};