import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  tap,
} from 'rxjs/operators';
import { saveInLocalStorage } from '../helpers/localStorage';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuth$.pipe(
      debounceTime(1),
      pluck('user'),
      distinctUntilChanged(),
      map((user) => {
        if (!user) return true;
        else {
          saveInLocalStorage('user-show', user);
          this.router.navigate([`/${user.rol}`]);
          return false;
        }
      })
    );
  }
}
