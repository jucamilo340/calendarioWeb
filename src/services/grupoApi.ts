import api from './api';
import {
  CREATE_GRUPO,
  DELETE_GRUPO,
  GET_GRUPO,
  GET_GRUPO_ALL,
  UPDATE_GRUPO,
} from './Routes'; // Make sure to adjust the import based on your actual Routes file

interface ICreateGrupo {
  grupo: {
    nombre: string;
    semestre: number;
    diurno: boolean;
  };
}

export const createGrupo = async (data: ICreateGrupo) => {
  try {
    const response = await api.post(CREATE_GRUPO, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getGrupo = async (id: string) => {
  try {
    const response = await api.get(GET_GRUPO(id));
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllGrupos = async () => {
  try {
    const response = await api.get(GET_GRUPO_ALL);
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IUpdateGrupo {
  grupo: {
    _id: string;
    nombre: string;
    semestre: number;
    diurno: boolean;
  };
}

export const updateGrupo = async (data: IUpdateGrupo) => {
  try {
    const response = await api.put(UPDATE_GRUPO, data);
    return response.data;
  } catch (err) {
    return err;
  }
};


export const deleteGrupo = async (id: string) => {
  try {
    const response = await api.delete(DELETE_GRUPO(id));
    return response.data;
  } catch (err) {
    return err;
  }
};
