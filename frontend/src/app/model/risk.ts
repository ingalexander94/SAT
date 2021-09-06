import { User } from './auth';

export interface Risk {
  name: String;
  path: String;
  description: String;
  icon: String;
}

export interface Postulation {
  _id?: any;
  student: User;
  postulator: User;
  date: Date;
  description: String;
  state?: String;
  isActive: boolean;
}

export interface PostulationResponse {
  data: Postulation[];
  totalPages: number;
}
export interface ResposeUpdatePostulation {
  data?: null;
  msg: String;
  ok: Boolean;
}
export interface ResposeCounterPostulation {
  data: Number;
  msg: String;
  ok: Boolean;
}
export interface ResposeStudentPostulation {
  data: Postulation;
  msg: String;
  ok: Boolean;
}

export interface Profit {
  fechaFinal?: Date;
  fechaInicio: Date;
  nombre: String;
  descripcion: String;
  semestre: Number;
  riesgo?: String;
}

export interface ProfitResponse {
  data: Profit[];
  msg: String;
  ok: boolean;
}
