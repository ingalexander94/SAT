import { Action } from '@ngrx/store';
import { User } from 'src/app/model/auth';

export const ADD_USER = '[AUTH] Agregar usuario loagueado';
export const REMOVE_USER = '[AUTH] Quitar usuario cuando se salga';

export class AddUserAction implements Action {
  readonly type = ADD_USER;
  constructor(public user: User) {}
}

export class RemoveUserAction implements Action {
  readonly type = REMOVE_USER;
  constructor() {}
}

export type actions = AddUserAction | RemoveUserAction;
