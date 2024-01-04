import { CREATE_SUBJECT_CALENDAR } from "./subjectCalendarApi";
import api from './api';

export const createSubject = async (data: any) => {
    try {
      const response = await api.post(CREATE_SUBJECT_CALENDAR, data);
      return response.data;
    } catch (err) {
      return err;
    }
  };
  