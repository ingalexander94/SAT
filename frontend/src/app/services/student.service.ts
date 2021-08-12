import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseCourse } from '../model/course';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { LoadingCourseAction } from '../reducer/course/course.actions';
import { UserResponse } from '../model/auth';
import {
  FinishLoadingAction,
  StartLoadingAction,
} from '../reducer/ui/ui.actions';
import { NotificationService } from './notification.service';
import { Postulation, ProfitResponse } from '../model/risk';
import { ResponseSemester } from '../model/semester';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  url: String = environment.url_backend;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private notificationService: NotificationService
  ) {}

  async listCourses(code: String) {
    try {
      this.store.dispatch(new StartLoadingAction());
      const { data } = await this.http
        .get<ResponseCourse>(this.url + '/students/course/' + code)
        .toPromise();
      this.store.dispatch(new LoadingCourseAction(data));
      if (code) this.notificationService.getNotifications(code);
    } catch (error) {
      console.error(error);
    }
    this.store.dispatch(new FinishLoadingAction());
  }

  getCourses(code: String) {
    try {
      return this.http
        .get<ResponseCourse>(this.url + '/students/course/' + code)
        .toPromise();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getTeacherOfCourse(code: String) {
    try {
      return this.http
        .get<UserResponse>(this.url + '/teachers/' + code)
        .toPromise();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  generatePostulation(postulation: Postulation) {
    try {
      return this.http
        .post<any>(this.url + '/students/postulate', postulation)
        .toPromise();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  validatePostulation(data) {
    try {
      return this.http
        .post<Postulation>(this.url + '/students/postulate/validate', data)
        .toPromise();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getProfits(code: String, risk: String) {
    try {
      return this.http
        .get<ProfitResponse>(
          this.url + '/students/profits/' + code + '/' + risk
        )
        .toPromise();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getProfitsAdmin(code: String, risk: String) {
    try {
      const params = new HttpParams()
        .set('code', code.toString())
        .set('risk', risk.toString());
      return this.http
        .get<any>(this.url + '/students/profits/risk', { params })
        .toPromise();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getByCode(code: String) {
    try {
      return this.http
        .get<UserResponse>(this.url + '/students/' + code)
        .toPromise();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getSemesters(code: String) {
    try {
      return this.http
        .get<ResponseSemester>(this.url + '/students/semesters/' + code)
        .toPromise();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
