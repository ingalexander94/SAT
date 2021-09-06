export interface Talk {
  code: String;
  email: String;
  name: String;
}

export interface ResponseChat {
  _id: any;
  message: String;
  date: Date;
  transmitter: Talk;
  receiver: Talk;
}
export interface ResponseSendMessage {
  data: ResponseChat;
  message: String;
  ok: Boolean;
}
