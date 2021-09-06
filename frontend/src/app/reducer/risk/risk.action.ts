import { Action } from '@ngrx/store';
import { RiskUFPS } from 'src/app/model/risk';

export const LOAD_RISK = '[RISK] Cargar riesgos';
export const REMOVE_RISK = '[RISK] Eliminar riesgos';
export const SET_RISK_GLOBAL = '[RISK] Cargar riesgo global';

export class LoadRiskAction implements Action {
  readonly type = LOAD_RISK;
  constructor(public payload: RiskUFPS[]) {}
}

export class SetRiskGlobalAction implements Action {
  readonly type = SET_RISK_GLOBAL;
  constructor(public payload: number) {}
}

export class RemoveRiskAction implements Action {
  readonly type = REMOVE_RISK;
  constructor() {}
}

export type actions = LoadRiskAction | RemoveRiskAction | SetRiskGlobalAction;
