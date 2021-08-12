import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AppState } from '../app.reducers';
import { showAlert } from '../helpers/alert';
import { saveInLocalStorage } from '../helpers/localStorage';
import { AuthResponse, UserAuth } from '../model/auth';
import { AddUserAction } from '../reducer/auth/auth.actions';
import { AuthState } from '../reducer/auth/auth.reducer';
import {
  StartLoadingAction,
  FinishLoadingAction,
  SetError,
} from '../reducer/ui/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: String = environment.url_backend;
  withOutToken: HttpClient;
  isAuth$: Observable<AuthState> = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private httpClient: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.withOutToken = new HttpClient(this.httpBackend);
    this.isAuth$ = this.store.select('auth');
  }

  async login(dataLogin: UserAuth, typeUser: String) {
    this.store.dispatch(new StartLoadingAction());
    try {
      const req = await this.withOutToken
        .post<AuthResponse>(
          this.endpoint + '/auth/' + typeUser + '/login',
          dataLogin
        )
        .toPromise();
      const { msg, data, token } = req;
      localStorage.setItem('x-token', token.toString());
      showAlert('success', msg);
      this.store.dispatch(new AddUserAction(data));
      saveInLocalStorage('user-show', data);
      this.router.navigate([`/${data.rol.toLowerCase()}`]);
    } catch (error) {
      this.store.dispatch(new SetError('Ocurrio un error en el servidor', '/'));
      showAlert('error', error.error.msg);
      this.router.navigate(['/error']);
    }
    this.store.dispatch(new FinishLoadingAction());
  }

  renewToken() {
    return this.httpClient
      .get<AuthResponse>(this.endpoint + '/auth/renew')
      .toPromise();
  }

  isAuthenticated() {
    const user = true;
    return user;
  }
}
