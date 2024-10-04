import api from './api';
import {
  CREATE_PLAN,
  DELETE_PLAN,
  GET_PLAN,
  GET_PLAN_ALL,
  UPDATE_PLAN,
} from './Routes';

interface ICreatePlan {
  plan: {
    nombre: string;
    semestres: number;
    horario: string;
  };
}

export const createPlan = async (data: ICreatePlan) => {
  try {
    const response = await api.post(CREATE_PLAN, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getPlan = async (id: string) => {
  try {
    const response = await api.get(GET_PLAN(id));
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllPlanes = async () => {
  try {
    const response = await api.get(GET_PLAN_ALL);
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IUpdatePlan {
  plan: {
    _id: string;
    nombre: string;
    semestres: number;
    horario: string;
  };
}

export const updatePlan = async (data: IUpdatePlan) => {
  try {
    const response = await api.put(UPDATE_PLAN, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deletePlan = async (id: string) => {
  try {
    const response = await api.delete(DELETE_PLAN(id));
    return response.data;
  } catch (err) {
    return err;
  }
};
