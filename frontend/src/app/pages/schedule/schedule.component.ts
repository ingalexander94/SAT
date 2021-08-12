import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map, pluck, tap } from 'rxjs/operators';
import { showAlert, showQuestion } from 'src/app/helpers/alert';
import { saveInLocalStorage } from 'src/app/helpers/localStorage';
import { FilterMeet, Meet } from 'src/app/model/meet';
import { Title } from 'src/app/model/ui';
import { StudentService } from 'src/app/services/student.service';
import { UiService } from 'src/app/services/ui.service';
import { WellnessService } from 'src/app/services/wellness.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  title: Title = {
    title: 'Lista de Citas',
    subtitle: '',
  };
  subscription: Subscription = new Subscription();
  totalPages: number[] = [];
  page: number = 0;
  meets: Meet[] = [];
  loading: Boolean = true;
  state: string = 'ACEPTADA';
  date: string = new Date().toISOString().split('T')[0];
  showModal: Boolean = false;
  @ViewChild('checkbox') checkbox: ElementRef;

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute,
    private wellnessService: WellnessService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.uiService.updateTitleNavbar('Agenda');
  }

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        pluck('pagina'),
        distinctUntilChanged(),
        map((page) => (!page ? '1' : page)),
        tap((page) => (this.page = parseInt(page)))
      )
      .subscribe((page) => this.loadMeets(page, this.state, this.date));
  }

  async loadMeets(page: string, state: string, date: string) {
    this.loading = true;
    const { totalPages, data } = await this.wellnessService.postulateMeet(
      page,
      state,
      date
    );
    this.totalPages = Array(totalPages)
      .fill(0)
      .map((_, i) => i + 1);
    this.meets = data;
    this.loading = false;
  }

  async toStudent(code: String) {
    this.loading = true;
    const data = await this.studentService.getByCode(code);
    if (data.ok) {
      saveInLocalStorage('user-show', data.data);
      this.router.navigate(['/estudiante/bitacora']);
    } else {
      showAlert('error', 'Algo salio mal');
    }
    this.loading = true;
  }

  onShowModal(show: FilterMeet = { show: true }) {
    this.showModal = show.show;
    if (show.state || show.date) {
      this.loadMeets('1', show.state, show.date);
      this.state = show.state;
    }
  }

  async onChange(id: String, e: any, code: String, i: number) {
    const { isConfirmed, dismiss } = await showQuestion(
      '¿El estudiante asistio a la reunión?',
      'Puede revertir los cambios eventualmente'
    );
    if (!dismiss) {
      this.checkbox.nativeElement.checked = isConfirmed;
      await this.wellnessService.attendanceMeet(id, isConfirmed, code);
      if (isConfirmed) this.meets.splice(i, 1);
    } else this.checkbox.nativeElement.checked = !e.target.checked;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
