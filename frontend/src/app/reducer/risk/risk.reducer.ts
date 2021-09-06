import { RiskUFPS } from 'src/app/model/risk';
import * as fromRisk from './risk.action';

export interface RiskState {
  risks: RiskUFPS[];
  globalRisk: number;
}

const initState: RiskState = {
  risks: [],
  globalRisk: 0,
};

export const riskReducer = (
  state = initState,
  actions: fromRisk.actions
): RiskState => {
  switch (actions.type) {
    case fromRisk.LOAD_RISK:
      return { ...state, risks: [...actions.payload] };

    case fromRisk.SET_RISK_GLOBAL:
      return { ...state, globalRisk: actions.payload };

    case fromRisk.REMOVE_RISK:
      return {
        risks: [],
        globalRisk: 0,
      };

    default:
      return { ...state };
  }
};
