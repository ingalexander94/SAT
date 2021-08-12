export interface User {
  _id: String;
  foto: String;
  codigo?: String;
  documento: String;
  nombre: String;
  apellido: String;
  sexo: String;
  correo: String;
  rol: String;
  programa?: String;
  telefono: String;
  direccion: String;
  estado?: string;
  fechaIngreso?: Date;
  creditosAprobados?: Number;
  edad: Number;
  creditosTotales?: Number;
  semestre?: Number;
  promedio?: Number;
  promedioPonderadoAcomulado?: Number;
  riesgo?: any;
}

export interface UserAuth {
  code?: String;
  document: String;
  password: String;
  role: String;
}

export interface AuthResponse {
  data: User;
  msg: String;
  token: String;
  ok: Boolean;
}

export interface UserResponse {
  msg: String;
  ok: Boolean;
  data: User;
}

export interface StudentResponse {
  msg: String;
  ok: Boolean;
  data: User[];
}
