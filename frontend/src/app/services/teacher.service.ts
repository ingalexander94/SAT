import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import { AppState } from '../app.reducers';
import { StudentResponse } from '../model/auth';
import { ResponseCourse } from '../model/course';
import {
  LoadingCourseAction,
  LoadStudentsAction,
} from '../reducer/course/course.actions';
import { FinishLoadingAction } from '../reducer/ui/ui.actions';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  url: String = environment.url_backend;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private location: Location
  ) {}

  async listCourses(code: String) {
    try {
      const { data } = await this.http
        .get<ResponseCourse>(this.url + '/teachers/course/' + code)
        .toPromise();
      this.store.dispatch(new LoadingCourseAction(data));
      if (code) this.notificationService.getNotifications(code);
    } catch (error) {
      console.error(error);
    }
    this.store.dispatch(new FinishLoadingAction());
  }

  async listStudentsOfCourse(code: String, group: String) {
    try {
      const res = await this.http
        .get<StudentResponse>(
          this.url + '/teachers/course/students/' + code + '/' + group
        )
        .toPromise();
      !res.ok
        ? this.location.back()
        : this.store.dispatch(new LoadStudentsAction(res.data));
    } catch (error) {
      console.error(error);
    }
  }
}
