export interface Activity {
  _id: any;
  name: String;
  date: Date;
  hour: String;
  place: String;
  risk: String;
  riskLevel: String;
}
export interface ResponseActivity {
  data: Activity;
  ok: Boolean;
  msg: String;
}
