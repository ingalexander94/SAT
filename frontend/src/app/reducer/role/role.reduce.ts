import { Role } from 'src/app/model/role';
import * as fromRole from './role.action';

export interface RoleState {
  role: Role[];
}

const initState: RoleState = {
  role: [],
};
export const roloReduce = (
  state = initState,
  actions: fromRole.actions
): RoleState => {
  switch (actions.type) {
    case fromRole.LOAD_ROLE:
      return { ...state, role: [...actions.payload] };

    case fromRole.REMOVE_ROLE:
      return { ...state, role: [] };

    default:
      return { ...state };
  }
};
