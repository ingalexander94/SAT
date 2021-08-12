import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { merge, Subscription } from 'rxjs';
import { filter, map, pluck, take } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { generatePDF } from 'src/app/helpers/pdf';
import { User } from 'src/app/model/auth';

@Component({
  selector: 'app-download-pdf',
  templateUrl: './download-pdf.component.html',
  styleUrls: ['./download-pdf.component.css'],
})
export class DownloadPdfComponent implements OnInit, OnDestroy {
  @Input() students: User[];
  subscription: Subscription = new Subscription();
  text: String = '';

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = merge(
      this.route.params.pipe(
        pluck('programa'),
        filter((program) => program),
        map((program) => `el programa de ${program.toUpperCase()}`)
      ),
      this.store.select('course').pipe(
        pluck('active'),
        filter((course) => course !== null),
        map(
          (course) =>
            `el curso de ${course.materia.nombre.toUpperCase()} - ${
              course.materia.codigo
            }${course.grupo}`
        )
      )
    )
      .pipe(take(1))
      .subscribe(
        (cad) =>
          (this.text = `Listado de estudiantes registrados actualmente en ${cad} con su respectivo nivel de riesgo de deserción detectado por SAT (Sistema de alertas tempranas) de la UFPS`)
      );
  }

  download() {
    generatePDF(this.students, this.text);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
