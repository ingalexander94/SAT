import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import { AppState } from '../app.reducers';
import { Activity, ResponseActivity } from '../model/activity';
import { loandActivitiesAction } from '../reducer/activity/activity.action';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  endpoint: String = environment.url_backend;

  constructor(private httpClient: HttpClient) {}

  createActivities(activity) {
    return this.httpClient
      .post<ResponseActivity>(`${this.endpoint}/activity/`, activity)
      .toPromise();
  }

  listActivities() {
    return this.httpClient
      .get<Activity[]>(`${this.endpoint}/activity/`)
      .toPromise();
  }

  listActivitiesStudent() {
    return this.httpClient
      .get<Activity[]>(`${this.endpoint}/activity/activities-student`)
      .toPromise();
  }

  listActivitiesAsist(code: String) {
    return this.httpClient
      .get<Activity[]>(`${this.endpoint}/activity/asist/${code}`)
      .toPromise();
  }

  asistActivity(asist: Boolean, activity: String) {
    return this.httpClient
      .post<any>(`${this.endpoint}/activity/asist`, { asist, activity })
      .toPromise();
  }
}
