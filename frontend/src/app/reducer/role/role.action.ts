import { Action } from '@ngrx/store';
import { Role } from 'src/app/model/role';

export const LOAD_ROLE = '[ROLE] Cargar roles';
export const REMOVE_ROLE = '[ROLE] Eliminar roles';

export class LoadRoleAction implements Action {
  readonly type = LOAD_ROLE;
  constructor(public payload: Role[]) {}
}
export class RemoverRoleAction implements Action {
  readonly type = REMOVE_ROLE;
  constructor() {}
}

export type actions = LoadRoleAction | RemoverRoleAction;
