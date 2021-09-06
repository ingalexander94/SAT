import { User } from './auth';

export interface Risk {
  name: String;
  path: String;
  riskGlobal: number;
  icon: String;
  color: Function;
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

export interface Profit {
  fechaFinal?: Date;
  fechaInicio: Date;
  nombre: String;
  descripcion: String;
  semestre: Number;
}

export interface ProfitResponse {
  data: Profit[];
  msg: String;
  ok: boolean;
}

export interface RiskUFPS {
  nombre: String;
  puntaje: number;
  items: ItemRisk[];
}

export interface ItemRisk {
  nombre: String;
  valor: number;
}

export interface RiskResponse {
  riesgos: RiskUFPS[];
  riesgoGlobal: number;
}
