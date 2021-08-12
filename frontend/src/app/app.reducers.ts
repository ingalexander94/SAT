import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './reducer/ui/ui.reducer';
import * as fromAuth from './reducer/auth/auth.reducer';
import * as fromCourse from './reducer/course/course.reducer';
import * as fromChat from './reducer/Chat/chat.reducer';
import * as fromNotification from './reducer/notification/notifications.reducer';

export interface AppState {
  ui: fromUI.UIState;
  auth: fromAuth.AuthState;
  course: fromCourse.CourseState;
  chat: fromChat.ChatState;
  notification: fromNotification.NotificationState;
}

export const combineReducer: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  course: fromCourse.courseReducer,
  chat: fromChat.chatReducer,
  notification: fromNotification.notificationReducer,
};
