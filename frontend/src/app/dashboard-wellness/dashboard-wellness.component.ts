import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducers';
import { tapN } from '../helpers/observers';
import { LoadRoleAction } from '../reducer/role/role.action';
import { StartLoadingAction } from '../reducer/ui/ui.actions';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-dashboard-wellness',
  templateUrl: './dashboard-wellness.component.html',
  styleUrls: ['./dashboard-wellness.component.css'],
})
export class DashboardWellnessComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  loading: boolean = true;

  constructor(
    private store: Store<AppState>,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private authService: AuthService
  ) {
    this.store.dispatch(new StartLoadingAction());
    this.subscription = this.store
      .pipe(
        filter(({ auth }) => auth.user !== null),
        tapN(1, ({ auth }) => {
          if (auth.user.rol !== 'vicerrector') {
            auth.user.rol === 'estudiante'
              ? this.studentService.listCourses(auth.user.codigo)
              : this.teacherService.listCourses(auth.user.codigo);
          }
        })
      )
      .subscribe(({ ui }) => {
        this.loading = ui.loading;
      });
  }
  ngOnInit(): void {
    this.getRoles();
  }
  async getRoles() {
    const res = await this.authService.listRoles();
    if (!res.hasOwnProperty('ok')) this.store.dispatch(new LoadRoleAction(res));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
