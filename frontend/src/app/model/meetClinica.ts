export interface MeetClinical {
  response: {
    meetClinical: {
      reasonConsultation: String;
      generalIllness: String;
      systemsReview: String;
      heartRate: String;
      breathingFrequency: String;
      bloodPressure: String;
      temperature: String;
      weight: String;
      size: String;
    };
    meet: {
      date: '2021-10-22';
      hour: '14:00';
    };
  };
}
