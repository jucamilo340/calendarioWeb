import api from './api';
import {
  CREATE_PROFESOR,
  DELETE_PROFESOR,
  GET_PROFESOR,
  GET_PROFESOR_ALL,
  UPDATE_PROFESOR,
} from './Routes';

interface IRangoHorario {
    dia: string;
    inicio: string;
    fin: string;
  }

interface ICreateProfesor {
  profesor: {
    nombre: string;
    fechaNacimiento?: Date;
    correoElectronico?: string;
    numeroTelefono?: string;
    tituloAcademico?: string;
    materias?: string[]; // IDs de materias
    disponibilidad: IRangoHorario[];
    salario?: number;
    auxiliar?: boolean;
  };
}

export const createProfesor = async (data: ICreateProfesor) => {
    const response = await api.post(CREATE_PROFESOR, data);
    return response?.data;
};

interface IGetProfesor {
  id: string;
}

export const getProfesor = async ({ id }: IGetProfesor) => {
  try {
    const response = await api.get(GET_PROFESOR(id));
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllProfesores = async ({ materiaId, grupoId, horario, eventoId }: { materiaId?: string, grupoId?:any, horario?: any, eventoId?:string } = {}) => {
  try {
    const params: Record<string, string> = {};
    if (materiaId) {
      params.materiaId = materiaId;
    }
    if (horario) {
      params.horario = horario;
    }
    if (eventoId) {
      params.eventoId = eventoId;
    }
    if (grupoId) {
      params.grupo = grupoId;
    }

    const response = await api.get(GET_PROFESOR_ALL, { params });
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IUpdateProfesor {
  profesor: {
    _id: string;
    nombre: string;
    fechaNacimiento?: Date;
    correoElectronico?: string;
    numeroTelefono?: string;
    tituloAcademico?: string;
    materias?: string[]; // IDs de materias
    disponibilidad: IRangoHorario[];
    salario?: number;
    auxiliar?: boolean;
  };
}

export const updateProfesor = async (data: IUpdateProfesor) => {
  try {
    const response = await api.put(UPDATE_PROFESOR, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

interface IDeleteProfesor {
  id: string;
}

export const deleteProfesor = async ({ id }: IDeleteProfesor) => {
  try {
    const response = await api.delete(DELETE_PROFESOR(id));
    return response.data;
  } catch (err) {
    return err;
  }
};
