import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { tapN } from 'src/app/helpers/observers';
import { User } from 'src/app/model/auth';
import { Semester } from 'src/app/model/semester';
import { StudentService } from 'src/app/services/student.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-permanence-information',
  templateUrl: './permanence-information.component.html',
  styleUrls: ['./permanence-information.component.css'],
})
export class PermanenceInformationComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  user: User = null;
  semesters: Semester = null;
  loading: Boolean = true;

  constructor(
    private store: Store<AppState>,
    private studentService: StudentService,
    private uiService: UiService
  ) {
    this.uiService.updateTitleNavbar('Académico');
  }

  ngOnInit(): void {
    this.store
      .select('ui')
      .pipe(
        filter(({ userActive }) => userActive !== null),
        tapN(1, async ({ userActive }) => {
          const { data } = await this.studentService.getSemesters(
            userActive.codigo
          );
          this.semesters = data;
          this.loading = false;
        })
      )
      .subscribe(({ userActive }) => (this.user = userActive));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
