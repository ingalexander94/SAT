import { User } from 'src/app/model/auth';
import { Course } from 'src/app/model/course';
import * as fromCourse from './course.actions';

export interface CourseState {
  courses: Course[];
  active: Course;
  students: User[];
}
const initState: CourseState = {
  courses: [],
  active: null,
  students: [],
};

export const courseReducer = (
  state = initState,
  actions: fromCourse.actions
): CourseState => {
  switch (actions.type) {
    case fromCourse.LOADING_COURSES:
      return {
        ...state,
        courses: [...actions.payload],
      };

    case fromCourse.DELETE_COURSES:
      return {
        ...state,
        courses: [],
      };

    case fromCourse.ACTIVE_COURSE:
      return {
        ...state,
        active: state.courses.find(
          (course) => course.materia.codigo === actions.payload
        ),
      };

    case fromCourse.DESACTIVE_COURSE:
      return {
        ...state,
        active: null,
      };

    case fromCourse.LOAD_STUDENTS:
      return {
        ...state,
        students: [...actions.payload],
      };

    case fromCourse.DELETE_STUDENTS:
      return {
        ...state,
        students: [],
      };

    default:
      return state;
  }
};
