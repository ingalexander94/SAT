import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { showAlert } from 'src/app/helpers/alert';
import { Activity } from 'src/app/model/activity';
import { loandActivityAction } from 'src/app/reducer/activity/activity.action';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-modal-activity',
  templateUrl: './modal-activity.component.html',
  styleUrls: ['./modal-activity.component.css'],
})
export class ModalActivityComponent implements OnInit {
  @Output() isClosed = new EventEmitter<boolean>();

  formCreateActivity: FormGroup;
  currentDate: Date = new Date();
  loading: boolean = false;

  constructor(
    private activityService: ActivityService,
    private store: Store<AppState>
  ) {
    this.formCreateActivity = this.createFormCreateActivity();
  }

  createFormCreateActivity(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required),
      risk: new FormControl('', Validators.required),
      riskLevel: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  close() {
    this.isClosed.emit(false);
  }
  onClick({ target }) {
    if (target.className === 'wrapper_alert') {
      this.close();
    }
  }

  async onSubmit() {
    this.loading = true;
    if (!this.formCreateActivity.invalid) {
      const date = new Date(
        this.formCreateActivity.get('date').value
      ).toISOString();
      const activities = {
        ...this.formCreateActivity.value,
        date,
      };
      const activity = await this.activityService.createActivities(activities);
      this.store.dispatch(new loandActivityAction(activity.data));
      this.close();
      showAlert('success', 'Actividad fue creada con exito');
    }
    this.loading = false;
  }

  get name() {
    return this.formCreateActivity.get('name');
  }

  get date() {
    return this.formCreateActivity.get('date');
  }

  get place() {
    return this.formCreateActivity.get('place');
  }

  get risk() {
    return this.formCreateActivity.get('risk');
  }

  get riskLevel() {
    return this.formCreateActivity.get('riskLevel');
  }

  get description() {
    return this.formCreateActivity.get('description');
  }
}
