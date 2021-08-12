import { Component, OnInit } from '@angular/core';
import { inRisk } from 'src/app/model/data';
import { StudentInDanger, Title } from 'src/app/model/ui';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-in-risk',
  templateUrl: './in-risk.component.html',
  styleUrls: ['./in-risk.component.css'],
})
export class InRiskComponent implements OnInit {
  title: Title = {
    title: 'Riesgo Crítico',
    subtitle: 'Estudiantes que se encuentran en riesgo crítico de deserción',
  };

  myProps = {
    type: 'risk',
    students: inRisk,
  };

  constructor(private uiService: UiService) {
    this.uiService.updateTitleNavbar('En Riesgo');
  }

  ngOnInit(): void {}
}
