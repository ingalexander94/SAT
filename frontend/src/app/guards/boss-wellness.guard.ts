import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BossWellnessGuard implements CanActivate {
  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuth$.pipe(
      pluck('user'),
      distinctUntilChanged(),
      map((user) => {
        if (!user) {
          this.location.back();
          return false;
        }
        if (user.rol === 'jefe' || user.rol === 'vicerrector') return true;
        else {
          this.router.navigate([`/${user.rol}`]);
          return false;
        }
      })
    );
  }
}
