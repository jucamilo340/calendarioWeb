export const CREATE_MATERIA = '/api/materia';
export const GET_MATERIA = (id: string) => `/api/materia/${id}`;
export const GET_MATERIA_ALL = '/api/materia/all';
export const UPDATE_MATERIA = 'api/materia';
export const DELETE_MATERIA= (id: string) => `/api/materia/${id}`;

export const CREATE_PLAN = '/api/plan';
export const GET_PLAN = (id: string) => `/api/plan/${id}`;
export const GET_PLAN_ALL = '/api/plan/all';
export const UPDATE_PLAN = '/api/plan';
export const DELETE_PLAN = (id: string) => `/api/plan/${id}`;

export const CREATE_PROFESOR = '/api/profesor';
export const GET_PROFESOR = (id: string) => `/api/profesor/${id}`;
export const GET_PROFESOR_ALL = '/api/profesor/all';
export const UPDATE_PROFESOR = '/api/profesor';
export const DELETE_PROFESOR = (id: string) => `/api/profesor/${id}`;

export const CREATE_SALON = `/api/salon`;
export const GET_SALON = (id:string) => `/api/salon/${id}`;
export const GET_SALON_ALL = `/api/salon/all`;
export const UPDATE_SALON = `/api/salon`;
export const DELETE_SALON = (id:string) => `/api/salon/${id}`;

export const CREATE_GRUPO = `/api/grupo`;
export const GET_GRUPO = (id: string) => `/api/grupo/${id}`;
export const GET_ASIGNACIONES = (id: string) => `/api/grupo/asignaciones/${id}`;
export const UPDATE_ASIGNACION = `/api/grupo/asignaciones`;
export const GET_GRUPO_ALL = `/api/grupo/all`;
export const UPDATE_GRUPO = `/api/grupo`;
export const DELETE_GRUPO = (id: string) => `/api/grupo/${id}`;

export const CREATE_EVENT_CALENDAR = 'api/eventCalendar';
export const GET_EVENT_CALENDAR = (id: string) => `api/eventCalendar/${id}`;
export const GET_ALL_EVENTS_CALENDAR = 'api/eventCalendar/all';
export const GENERATE_EVENT_CALENDAR = (id: string) => `api/eventCalendar/generar/${id}`;
export const UPDATE_EVENT_CALENDAR = 'api/eventCalendar';
export const UPDATE_DATE_EVENT_CALENDAR = 'api/eventCalendar/date';
export const DELETE_EVENT_CALENDAR = (id: string) => `api/eventCalendar/${id}`;
export const DELETE_ALL_EVENT_CALENDAR = (id: string) => `api/eventCalendar/all/${id}`;