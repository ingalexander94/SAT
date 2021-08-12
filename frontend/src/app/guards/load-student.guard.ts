import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { getValueOfLocalStorage } from '../helpers/localStorage';

@Injectable({
  providedIn: 'root',
})
export class LoadStudentGuard implements CanActivate {
  constructor(private location: Location) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = getValueOfLocalStorage('user-show');
    if (
      (user && user.rol === 'estudiante') ||
      state.url === '/estudiante/chat#contenedor' ||
      state.url === '/psicologo'
    )
      return true;
    else {
      this.location.back();
      return false;
    }
  }
}
