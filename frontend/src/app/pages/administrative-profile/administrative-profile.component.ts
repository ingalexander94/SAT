import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/auth';

@Component({
  selector: 'app-administrative-profile',
  templateUrl: './administrative-profile.component.html',
  styleUrls: ['./administrative-profile.component.css'],
})
export class AdministrativeProfileComponent implements OnInit {
  userShow: User = null;
  title: String;
  user: User = null;
  showUpdateProfile: boolean = false;
  active: String = '1';
  constructor() {}

  ngOnInit(): void {}

  showActive(state) {
    if (state !== this.active) {
      this.active = state;
    }
  }
}
