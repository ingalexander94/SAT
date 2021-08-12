import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Subscription } from 'rxjs';
import { UserAuth } from 'src/app/model/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  showPassword: boolean = false;
  typePassword: String = 'password';
  typeDocument: String = 'password';
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  createFormLogin(): FormGroup {
    return new FormGroup({
      role: new FormControl('jefe', Validators.required),
      code: new FormControl('1049486', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        Validators.pattern(/^[0-9]+$/i),
      ]),
      document: new FormControl('525933018', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/i),
      ]),
      password: new FormControl('7681', Validators.required),
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

  get role() {
    return this.formLogin.get('role');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
