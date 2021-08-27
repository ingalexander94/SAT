import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { resetDate } from 'src/app/helpers/ui';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css'],
})
export class ListReportsComponent implements OnInit {
  today: Date = new Date();
  lastReport: any = null;
  loading: boolean = false;
  loadingReport: boolean = false;
  constructor(
    private location: Location,
    private reportService: ReportService
  ) {
    this.lastReportSugestion();
  }

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  async onSubmit({ target }) {
    const startDate = resetDate(target[0].value);
    const endDate = resetDate(target[1].value);
    const action = target[2].value;
    const data = {
      startDate,
      endDate,
      action,
    };
    await this.reportService.reportSuggestion(data);
  }
  async lastReportSugestion() {
    this.loading = true;
    const res = await this.reportService.lastReportSuggestion();
    this.lastReport = res[0];
    this.loading = false;
  }
}
