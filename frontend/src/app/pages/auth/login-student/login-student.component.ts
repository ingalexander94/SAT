import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { UserAuth } from 'src/app/model/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css'],
})
export class LoginStudentComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  showPassword: boolean = false;
  typePassword: String = 'password';
  typeDocument: String = 'password';
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  createFormLogin(): FormGroup {
    return new FormGroup({
      role: new FormControl('estudiante', Validators.required),
      code: new FormControl('1072235', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        Validators.pattern(/^[0-9]+$/i),
      ]),
      document: new FormControl('1300162807', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/i),
      ]),
      password: new FormControl('9226', Validators.required),
    });
  }

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.formLogin = this.createFormLogin();
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('ui')
      .subscribe(({ loading }) => (this.loading = loading));
  }

  changeShowPassword() {
    this.showPassword = !this.showPassword;
    this.typePassword = this.showPassword ? 'text' : 'password';
  }

  changeTypeDocument(option: boolean) {
    option ? (this.typeDocument = 'text') : (this.typeDocument = 'password');
  }

  onSubmit() {
    const user: UserAuth = this.formLogin.value;
    this.authService.login(user, 'institutional');
  }

  get code() {
    return this.formLogin.get('code');
  }

  get document() {
    return this.formLogin.get('document');
  }

  get password() {
    return this.formLogin.get('password');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
