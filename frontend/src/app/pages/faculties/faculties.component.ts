import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { WellnessService } from 'src/app/services/wellness.service';
import { Facultie } from 'src/app/model/wellness';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css'],
})
export class FacultiesComponent implements OnInit {
  faculties: Facultie[] = [];
  loading: boolean = true;

  constructor(
    private uiService: UiService,
    private router: Router,
    private wellnessService: WellnessService
  ) {
    this.uiService.updateTitleNavbar('Facultades');
  }

  ngOnInit(): void {
    this.getFaculties();
  }

  async getFaculties() {
    const { data } = await this.wellnessService.getFaculties();
    this.faculties = data;
    this.loading = false;
  }

  goToInRisk() {
    this.router.navigate(['/vicerrector/en-riesgo']);
  }
}
