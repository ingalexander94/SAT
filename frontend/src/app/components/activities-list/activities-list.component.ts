import { Component, Input, OnInit } from '@angular/core';
import { activities } from 'src/app/model/data';
import { ActivitiesList } from 'src/app/model/ui';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
})
export class ActivitiesListComponent implements OnInit {
  activitiesList: ActivitiesList[] = activities;
  constructor(private uiService: UiService) {
    this.uiService.updateTitleNavbar('Perfil');
  }

  ngOnInit(): void {}
}
