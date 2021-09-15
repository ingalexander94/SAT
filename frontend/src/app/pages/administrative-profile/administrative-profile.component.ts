import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, pluck } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { showAlert } from 'src/app/helpers/alert';
import { normalizeRoles } from 'src/app/helpers/ui';
import { User } from 'src/app/model/auth';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-administrative-profile',
  templateUrl: './administrative-profile.component.html',
  styleUrls: ['./administrative-profile.component.css'],
})
export class AdministrativeProfileComponent implements OnInit, OnDestroy {
  userShow: User = null;
  title: String;
  user: User = null;
  showUpdateProfile: boolean = false;
  active: String = '1';
  subscription: Subscription = new Subscription();
  color: String = '';
  formChangePassword: FormGroup;
  showPassword: boolean = false;
  typePassword: String = 'password';
  showPassword2: boolean = false;
  typePassword2: String = 'password';
  showPassword3: boolean = false;
  typePassword3: String = 'password';
  loading: boolean = false;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UiService
  ) {
    this.formChangePassword = this.createFormLogin();
    this.uiService.updateTitleNavbar('Perfil');
    const colors: String[] = ['gray', 'blue', 'green', 'purple', 'orange'];
    this.color = `${colors[Math.floor(Math.random() * (5 + 0 - 0) + 0)]}-color`;
  }

  createFormLogin(): FormGroup {
    return this.formBuilder.group(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };

  ngOnInit(): void {
    this.subscription = this.store
      .select('auth')
      .pipe(
        pluck('user'),
        filter((user) => user !== null),
        distinctUntilChanged()
      )
      .subscribe((user) => (this.user = user));
  }

  showActive(state) {
    if (state !== this.active) {
      this.active = state;
    }
  }

  normalize(role: String) {
    return normalizeRoles(role);
  }

  async onSubmit() {
    this.loading = true;
    if (!this.formChangePassword.invalid) {
      const password = {
        ...this.formChangePassword.value,
        id: this.user._id,
      };
      delete password.confirmPassword;
      const res = await this.authService.changePassword(password);
      if (!res) {
        showAlert('error', 'No se pudo cambiar la contraseña');
      } else {
        showAlert('success', 'Contraseña actualizada');
        this.authService.logout('vicerrector');
      }
    }
    this.loading = false;
  }

  changeShowPassword() {
    this.showPassword = !this.showPassword;
    this.typePassword = this.showPassword ? 'text' : 'password';
  }

  changeShowPassword2() {
    this.showPassword2 = !this.showPassword2;
    this.typePassword2 = this.showPassword2 ? 'text' : 'password';
  }

  changeShowPassword3() {
    this.showPassword3 = !this.showPassword3;
    this.typePassword3 = this.showPassword3 ? 'text' : 'password';
  }

  get password() {
    return this.formChangePassword.get('password');
  }

  get newPassword() {
    return this.formChangePassword.get('newPassword');
  }

  get confirmPassword() {
    return this.formChangePassword.get('confirmPassword');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
