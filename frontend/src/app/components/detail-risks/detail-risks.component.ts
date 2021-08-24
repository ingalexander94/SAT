import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { normalizeText } from 'src/app/helpers/ui';
import { ItemRisk } from 'src/app/model/ui';
import { StudentService } from 'src/app/services/student.service';
import { WellnessService } from 'src/app/services/wellness.service';

@Component({
  selector: 'app-detail-risks',
  templateUrl: './detail-risks.component.html',
  styleUrls: ['./detail-risks.component.css'],
})
export class DetailRisksComponent implements OnInit, OnDestroy {
  @Input() itemsRisks: ItemRisk;

  profits: any[];
  loading: boolean = true;
  loadingSuggestion: boolean = false;
  subscription: Subscription = new Subscription();
  role: String = '';
  codeStudent: String = '';

  constructor(
    private studentService: StudentService,
    private wellnessService: WellnessService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(
        filter(({ auth, ui }) => auth.user !== null && ui.userActive !== null)
      )
      .subscribe(({ auth, ui }) => {
        this.role = auth.user.rol;
        this.codeStudent = ui.userActive.codigo;
        this.loadProfits(ui.userActive.codigo, normalizeText(ui.titleNavbar));
      });
  }

  async loadProfits(code: String, risk: String) {
    const { data } = await this.studentService.getProfitsAdmin(code, risk);
    this.profits = data;
    this.loading = false;
  }

  async createSuggestion(profit, index) {
    this.loadingSuggestion = true;
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const body = {
      codeStudent: this.codeStudent,
      profit,
      date: date.toISOString(),
    };
    await this.wellnessService.createSuggestion(body);
    this.loadingSuggestion = false;
    this.profits[index].isSuggested = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
