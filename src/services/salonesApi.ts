// salonApi.js

import api from './api';
import {
  CREATE_SALON,
  DELETE_SALON,
  GET_SALON,
  GET_SALON_ALL,
  UPDATE_SALON,
} from './Routes';

interface ICreateSalon {
  salon: {
    nombre: string;
    capacidad: number;
    disponibilidad: any[];  // Ajusta según la estructura de tu modelo
  };
}

export const createSalon = async (data: ICreateSalon) => {
  try {
    const response = await api.post(CREATE_SALON, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getSalon = async (id: string) => {
  try {
    const response = await api.get(GET_SALON(id));
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllSalones = async ({ eventoId, horario }: { eventoId?: string, horario?: any } = {}) => {
  try {
    const params: Record<string, string> = {};
    if (horario) {
      params.horario = horario;
    }
    if (eventoId) {
      params.eventoId = eventoId;
    }
    const response = await api.get(GET_SALON_ALL, { params });
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IUpdateSalon {
  salon: {
    _id: string;
    nombre: string;
    capacidad: number;
    disponibilidad: any[];  // Ajusta según la estructura de tu modelo
  };
}

export const updateSalon = async (data: IUpdateSalon) => {
  try {
    const response = await api.put(UPDATE_SALON, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IDeleteSalon {
  id: string;
}

export const deleteSalon = async ({ id }: IDeleteSalon) => {
  try {
    const response = await api.delete(DELETE_SALON(id));
    return response.data;
  } catch (err) {
    return err;
  }
};
