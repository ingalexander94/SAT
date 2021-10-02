import { Activity } from 'src/app/model/activity';
import * as fromActivity from './activity.action';

export interface ActivityState {
  activities: Activity[];
}
const initState: ActivityState = {
  activities: [],
};
export const activityReducer = (
  state = initState,
  actions: fromActivity.actions
): ActivityState => {
  switch (actions.type) {
    case fromActivity.LOAD_ACTIVITY:
      return { ...state, activities: [actions.payload, ...state.activities] };

    case fromActivity.LOAD_ACTIVITIES:
      return { ...state, activities: [...actions.payload] };

    case fromActivity.REMOVE_ACTIVITY:
      return { ...initState };

    default:
      return { ...state };
  }
};
