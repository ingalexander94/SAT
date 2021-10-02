import { Action } from '@ngrx/store';
import { Activity } from 'src/app/model/activity';

export const LOAD_ACTIVITIES = '[ACTIVITY] Cargar activities';
export const LOAD_ACTIVITY = '[ACTIVITY] Cargar activity';
export const REMOVE_ACTIVITY = '[ACTIVITY] Eliminar activity';

export class loandActivitiesAction implements Action {
  readonly type = LOAD_ACTIVITIES;
  constructor(public payload: Activity[]) {}
}
export class loandActivityAction implements Action {
  readonly type = LOAD_ACTIVITY;
  constructor(public payload: Activity) {}
}
export class removerActivityAction implements Action {
  readonly type = REMOVE_ACTIVITY;
  constructor() {}
}

export type actions =
  | loandActivitiesAction
  | loandActivityAction
  | removerActivityAction;
