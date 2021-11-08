import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Subscription } from 'rxjs';
import { UserAuth } from 'src/app/model/auth';
import { GoogleService } from 'src/app/services/google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  user: gapi.auth2.GoogleUser;
  subscription: Subscription = new Subscription();
  subscription2: Subscription = new Subscription();

  constructor(
    private googleService: GoogleService,
    private ref: ChangeDetectorRef,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('ui')
      .subscribe(({ loading }) => (this.loading = loading));
    this.subscription2 = this.googleService.observable().subscribe((user) => {
      this.user = user;
      if (!this.user) {
        this.loading = false;
      }
      console.log(user);
      this.ref.detectChanges();
    });
  }

  signIn() {
    this.loading = true;
    const { protocol, host } = window.location;
    this.googleService.singIn(
      `${protocol}//${host}/docente/iniciar-sesion`,
      'teacher'
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
