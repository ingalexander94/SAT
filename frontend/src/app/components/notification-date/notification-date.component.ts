import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { showAlert } from 'src/app/helpers/alert';
import { Meet } from 'src/app/model/meet';
import { Postulation } from 'src/app/model/risk';
import { UpdateCounterAction } from 'src/app/reducer/notification/notification.actions';
import { WellnessService } from 'src/app/services/wellness.service';

@Component({
  selector: 'app-notification-date',
  templateUrl: './notification-date.component.html',
  styleUrls: ['./notification-date.component.css'],
})
export class NotificationDateComponent implements OnInit, OnDestroy {
  @Output() isClosed = new EventEmitter<any>();
  @Input() postulation: Postulation;
  formDate: FormGroup;
  subscription: Subscription = new Subscription();
  student: any = null;
  loading: boolean = false;

  createFormDate(): FormGroup {
    return new FormGroup({
      role: new FormControl('psicologo', Validators.required),
      date: new FormControl('', Validators.required),
      ubication: new FormControl('', Validators.required),
    });
  }

  constructor(
    private store: Store<AppState>,
    private wellnessService: WellnessService
  ) {
    this.formDate = this.createFormDate();
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('ui')
      .pipe(
        pluck('userActive'),
        map(({ codigo, nombre, apellido, correo }) => ({
          codigo,
          correo,
          nombre: `${nombre} ${apellido}`,
        }))
      )
      .subscribe((user) => (this.student = user));
  }

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
    if (!this.formDate.invalid) {
      const dateFormat = new DatePipe('es-Ar').transform(
        this.formDate.get('date').value,
        "EEEE, d 'de' MMMM 'del' y"
      );
      const meet: Meet = {
        ...this.formDate.value,
        state: 'SIN RESPONDER',
        attendance: false,
        student: this.student,
        dateFormat,
        postulation: this.postulation._id.$oid,
      };
      const { ok } = await this.wellnessService.createMeet(meet);
      if (ok) {
        this.store.dispatch(new UpdateCounterAction());
        this.postulation.state = 'NOTIFICADO PARA CITA';
        this.close();
      } else {
        showAlert('error', 'No se pudo notificar el estudiante');
        this.close();
      }
    }
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
