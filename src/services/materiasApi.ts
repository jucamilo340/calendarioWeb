import api from './api';
import {
  CREATE_MATERIA,
  DELETE_MATERIA,
  GET_MATERIA,
  GET_MATERIA_ALL,
  UPDATE_MATERIA,
} from './Routes';

interface ICreateMateria {
  materia: {
    nombre: string;
    horas: number;
    horasSemanales: number;
    credits: number;
  };
}

export const createMateria = async (data: ICreateMateria) => {
  try {
    const response = await api.post(CREATE_MATERIA, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getMateria = async (id: string) => {
  try {
    const response = await api.get(GET_MATERIA(id));
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllMaterias = async () => {
  try {
    const response = await api.get(GET_MATERIA_ALL);
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IUpdateMateria {
  materia: {
    _id: string;
    nombre: string;
    horas: number;
    horasSemanales: number;
    credits: number;
  };
}

export const updateMateria = async (data: IUpdateMateria) => {
  try {
    const response = await api.put(UPDATE_MATERIA, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IDeleteMateria {
  id: string;
}

export const deleteMateria = async ({ id }: IDeleteMateria) => {
  try {
    const response = await api.delete(DELETE_MATERIA(id));
    return response.data;
  } catch (err) {
    return err;
  }
};
