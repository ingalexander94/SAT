import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { getValueOfLocalStorage } from 'src/app/helpers/localStorage';
import { Course } from 'src/app/model/course';
import { Title } from 'src/app/model/ui';
import { LoadingCourseAction } from 'src/app/reducer/course/course.actions';
import { StudentService } from 'src/app/services/student.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-academy-list-course',
  templateUrl: './academy-list-course.component.html',
  styleUrls: ['./academy-list-course.component.css'],
})
export class AcademyListCourseComponent implements OnInit, OnDestroy {
  title: Title = {
    title: 'Listado de Materias',
    subtitle: 'Materias que se encuentran activas durante el semestre actual.',
  };

  subscription: Subscription = new Subscription();
  listCourses: Course[];
  loading: boolean = true;

  constructor(
    private uiService: UiService,
    private store: Store<AppState>,
    private studentService: StudentService
  ) {
    this.uiService.updateTitleNavbar();
  }

  ngOnInit(): void {
    this.subscription = this.store.subscribe(
      ({ course: { courses } }) => (this.listCourses = courses)
    );

    this.loadCourses();
  }

  async loadCourses() {
    const user = getValueOfLocalStorage('user-show');
    const { data } = await this.studentService.getCourses(user.codigo);
    this.store.dispatch(new LoadingCourseAction(data));
    this.loading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
