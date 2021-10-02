import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { Activity } from 'src/app/model/activity';
import { loandActivitiesAction } from 'src/app/reducer/activity/activity.action';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  create: boolean = false;
  activities: Activity[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private activityService: ActivityService,
    private store: Store<AppState>
  ) {
    this.listActivity();
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('activity')
      .pipe(filter((activity) => activity !== null))
      .subscribe((activity) => {
        this.activities = activity.activities;
      });
  }

  createActivity(answer: boolean = true) {
    this.create = answer;
  }
  async listActivity() {
    const activities = await this.activityService.listActivities();
    this.store.dispatch(new loandActivitiesAction(activities));
  }
}
