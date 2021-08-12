export interface Meet {
  _id: any;
  student: {
    nombre: String;
    correo: String;
    codigo: String;
  };
  postulation: String;
  state: String;
  ubication: String;
  date: Date;
  reason?: String;
  role: string;
  dateFormat: String;
  attendance: Boolean;
}

export interface MeetResponse {
  ok: Boolean;
  data: Meet;
  msg: String;
}

export interface FilterMeet {
  show: Boolean;
  state?: string;
  date?: string;
}
