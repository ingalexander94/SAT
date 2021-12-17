import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { showAlert } from 'src/app/helpers/alert';
import { SemesterBoss } from 'src/app/model/semester';
import {
  SetCourseSemesterAction,
  SetGroupsSemesterAction,
} from 'src/app/reducer/semester/semester.actions';
import { BossService } from 'src/app/services/boss.service';

@Component({
  selector: 'app-semester-courses',
  templateUrl: './semester-courses.component.html',
  styleUrls: ['./semester-courses.component.css'],
})
export class SemesterCoursesComponent implements OnInit, OnDestroy {
  semesters: SemesterBoss[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private bossService: BossService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('semester')
      .pipe(
        pluck('semesters'),
        filter((x) => x.length > 0)
      )

      .subscribe((semesters) => (this.semesters = semesters));
  }

  async showSemesterCourse(semester: number) {
    if (!this.semesters[semester - 1].cursos.length) {
      const res = await this.bossService.showSemesterCourses(semester);
      if (res.ok) {
        this.store.dispatch(new SetCourseSemesterAction(res.data, semester));
        setTimeout(() => {
          const item = <HTMLInputElement>(
            document.getElementById(`item-${semester}`)
          );
          item.checked = true;
        }, 1000);
      }
    }
  }

  async showCoursesGroups(semester: number, course: number, codigo: String) {
    if (!this.semesters[semester - 1].cursos[course - 1].grupos.length) {
      const codeProgram = codigo.slice(0, -4);
      const codeCourse = codigo.slice(-4);
      const res = await this.bossService.showCoursesGroups(
        codeProgram,
        codeCourse
      );
      if (res.ok) {
        this.store.dispatch(
          new SetGroupsSemesterAction(res.data, course, semester)
        );
        setTimeout(() => {
          const item1 = <HTMLInputElement>(
            document.getElementById(`item-${semester}`)
          );
          const item2 = <HTMLInputElement>(
            document.getElementById(`item_course-${course}`)
          );
          item1.checked = true;
          item2.checked = true;
        }, 1000);
      } else {
        showAlert('warning', res.msg);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
