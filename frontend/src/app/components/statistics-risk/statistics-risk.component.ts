import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-risk',
  templateUrl: './statistics-risk.component.html',
  styleUrls: ['./statistics-risk.component.css'],
})
export class StatisticsRiskComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  toInRisk() {
    this.router.navigate(['/vicerrector/en-riesgo']);
  }
}
