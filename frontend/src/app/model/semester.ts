export interface InfoSemester {
  estado: String;
  fecha: String;
  promedio: String;
}

export interface Semester {
  data: InfoSemester[];
  registered: Number;
}

export interface ResponseSemester {
  ok: Boolean;
  msg: String;
  data: Semester;
}
