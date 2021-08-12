import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { saveInLocalStorage } from 'src/app/helpers/localStorage';
import { User } from 'src/app/model/auth';
import { DeleteStudentsAction } from 'src/app/reducer/course/course.actions';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-table-risk',
  templateUrl: './table-risk.component.html',
  styleUrls: ['./table-risk.component.css'],
})
export class TableRiskComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  subscription2: Subscription = new Subscription();
  loading: boolean = true;
  filter: String = '';
  show: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private uiService: UiService
  ) {}

  listStudents: User[];

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.store
      .select('course')
      .pipe(filter(({ students }) => students.length > 0))
      .subscribe(({ students }) => {
        this.listStudents = students;
        this.loading = false;
      });
    this.subscription2 = this.uiService.filter$.subscribe(
      (filter) => (this.filter = filter)
    );
  }

  navigateToStudent(userShow: User) {
    saveInLocalStorage('user-show', userShow);
    saveInLocalStorage('receiver', userShow);
    this.router.navigate(['/estudiante/informacion-permanencia']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.store.dispatch(new DeleteStudentsAction());
  }

  showOptions() {
    this.show = !this.show;
  }

  filterStudents(name: string = '') {
    this.filter = name;
    this.showOptions();
  }
}
