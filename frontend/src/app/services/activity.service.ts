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

  constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

  createActivities(activity: Activity) {
    return this.httpClient
      .post<ResponseActivity>(`${this.endpoint}/activity/`, activity)
      .toPromise();
  }
  listActivities() {
    return this.httpClient
      .get<Activity[]>(`${this.endpoint}/activity/`)
      .toPromise();
  }
}
