import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { showAlert } from 'src/app/helpers/alert';
import { Binnacle } from 'src/app/model/administrative';
import { BinnacleService } from 'src/app/services/binnacle.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-binnacle',
  templateUrl: './binnacle.component.html',
  styleUrls: ['./binnacle.component.css'],
})
export class BinnacleComponent implements OnInit, OnDestroy {
  binnacle: Binnacle[] = [];
  subscription: Subscription = new Subscription();
  role: String = '';
  code: String = '';
  formBinnacle: FormGroup;
  show: Boolean = false;
  loading: Boolean = false;

  createFormBinnacle(): FormGroup {
    return new FormGroup({
      text: new FormControl('', Validators.required),
    });
  }

  constructor(
    private uiService: UiService,
    private binnacleService: BinnacleService,
    private store: Store<AppState>
  ) {
    this.formBinnacle = this.createFormBinnacle();
    this.uiService.updateTitleNavbar('Perfil');
  }

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(
        filter(({ ui, auth }) => auth.user !== null && ui.userActive !== null),
        map(({ ui, auth }) => ({
          code: ui.userActive.codigo,
          role: auth.user.rol,
        }))
      )
      .subscribe(({ code, role }) => {
        this.role = role;
        this.code = code;
        this.loadBinnacle();
      });
  }

  async loadBinnacle() {
    const binnacle = await this.binnacleService.getBinnacle(this.code);
    this.binnacle = binnacle;
  }

  async onSubmit() {
    this.loading = true;
    if (!this.formBinnacle.invalid) {
      const binnacle: Binnacle = {
        text: this.formBinnacle.get('text').value,
        role: this.role.toString(),
        student: this.code,
        date: new Date().toISOString(),
      };
      const data = await this.binnacleService.toWriter(binnacle);
      if (data.ok) {
        this.binnacle = [...this.binnacle, data.data];
      } else {
        showAlert('error', 'Algo salio mal');
      }
      this.formBinnacle.reset();
      this.show = false;
    }
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
