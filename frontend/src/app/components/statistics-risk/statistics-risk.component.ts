import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { Statistics, StatisticsRisk } from 'src/app/model/risk';
import { RiskService } from 'src/app/services/risk.service';

@Component({
  selector: 'app-statistics-risk',
  templateUrl: './statistics-risk.component.html',
  styleUrls: ['./statistics-risk.component.css'],
})
export class StatisticsRiskComponent implements OnInit, OnDestroy {
  statistics: Statistics[] = [];
  loading: Boolean = true;
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private riskService: RiskService
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('risk')
      .pipe(pluck('statisticsRisk'), distinctUntilChanged())
      .subscribe((a) => {
        this.calculateStatistics(a);
      });
  }

  toInRisk() {
    this.router.navigate(['/vicerrector/en-riesgo']);
  }

  async calculateStatistics(statistics: StatisticsRisk) {
    const res = await this.riskService.calculateTotalStatistics(statistics);
    if (res.ok) this.statistics = res.data;
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
