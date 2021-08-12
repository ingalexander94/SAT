import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, pluck, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { showAlert } from 'src/app/helpers/alert';
import { Meet } from 'src/app/model/meet';
import { UiService } from 'src/app/services/ui.service';
import { WellnessService } from 'src/app/services/wellness.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css'],
})
export class MeetingComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  meet: Meet = null;
  meets: Meet[] = [];
  loading: Boolean = true;
  res: Boolean = true;
  @ViewChild('reasons') reasons: ElementRef;

  constructor(
    private uiService: UiService,
    private wellnessService: WellnessService,
    private store: Store<AppState>
  ) {
    this.uiService.updateTitleNavbar('Asistencia Reunion');
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('ui')
      .pipe(
        filter(({ userActive }) => userActive !== null),
        pluck('userActive'),
        distinctUntilChanged(),
        tap(({ codigo }) => {
          this.loadMeets(codigo);
          this.getMeetsStudent(codigo);
        })
      )
      .subscribe();
  }

  async getMeetsStudent(code: String) {
    this.meets = await this.wellnessService.getMeetsStudent(code);
  }

  async loadMeets(code: String) {
    const data = await this.wellnessService.getMeetOfStudent(code);
    this.meet = data;
    this.loading = false;
  }

  async accept(option: boolean) {
    this.loading = true;
    const reason = this.reasons.nativeElement.value;
    if (option) {
      await this.wellnessService.acceptMeet(this.meet._id.$oid, option);
      this.updateStateMeet('ACEPTADA');
      this.res = false;
    } else {
      if (!reason.length) {
        showAlert('warning', 'Debe escribir los motivos');
      } else {
        await this.wellnessService.acceptMeet(
          this.meet._id.$oid,
          option,
          reason
        );
        this.updateStateMeet('RECHAZADA');
        this.res = false;
      }
    }
    this.loading = false;
  }

  updateStateMeet(newState: String) {
    this.meets = this.meets.map((meet) => {
      if (meet._id.$oid === this.meet._id.$oid) meet.state = newState;
      return meet;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
