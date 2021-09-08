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
  counter1: number = 0;
  counter2: number = 0;
  counter3: number = 0;

  statistics: Statistics[] = [
    {
      type: 'Leve',
      total: 0,
      counter: 0,
    },
    {
      type: 'Moderado',
      total: 0,
      counter: 0,
    },
    {
      type: 'Crítico',
      total: 0,
      counter: 0,
    },
  ];
  loading: Boolean = true;
  subscription: Subscription = new Subscription();

  leve = null;
  moderado = null;
  critico = null;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private riskService: RiskService
  ) {
    // this.leve = setInterval(() => this.animate1(), 1000);
    // this.moderado = setInterval(() => this.animate2(), 1000);
    // this.critico = setInterval(() => this.animate3(), 1000);
  }

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

    this.loading = false;
    res.data[0].counter = 0;
    res.data[1].counter = 0;
    res.data[2].counter = 0;
    this.leve = setInterval(() => this.animate1(res.data[0]), 100);
    this.moderado = setInterval(() => this.animate2(res.data[1]), 1000);
    this.critico = setInterval(() => this.animate3(res.data[2]), 1000);
    if (res.ok) this.statistics = res.data;
  }
  animate1(data: Statistics) {
    if (data.counter < data.total) {
      data.counter += 1;
    } else {
      clearInterval(this.leve);
    }
  }
  animate2(data: Statistics) {
    if (data.counter < data.total) {
      data.counter += 1;
    } else {
      clearInterval(this.moderado);
    }
  }
  animate3(data: Statistics) {
    if (data.counter < data.total) {
      data.counter += 1;
    } else {
      clearInterval(this.critico);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
