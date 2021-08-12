
export interface Talk{
    code:String;
    email:String;
    name:String;
}

export interface ResponseChat{
    _id:any;
    message: String;
    date: Date;
    transmitter: Talk;
    receiver: Talk;
  }