import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from '../pages/course/course.component';
import { ListCourseComponent } from '../pages/list-course/list-course.component';
import { ProfileTeacherComponent } from '../pages/profile-teacher/profile-teacher.component';
import { ProfileTeacherTeacherComponent } from '../pages/profile-teacher-teacher/profile-teacher-teacher.component';
import { DashboardComponent } from './dashboard.component';

const children: Routes = [
  {
    path: '',
    component: ListCourseComponent,
  },
  {
    path: 'materia/:code/:group',
    component: CourseComponent,
  },
  {
    path: 'perfil/:code',
    component: ProfileTeacherComponent,
  },
  {
    path: 'perfil',
    component: ProfileTeacherTeacherComponent,
  },
];
const routes: Routes = [{ path: '', component: DashboardComponent, children }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
