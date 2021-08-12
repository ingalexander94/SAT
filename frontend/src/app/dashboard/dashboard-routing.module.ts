import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionalGuard } from '../guards/institutional.guard';
import { StudentGuard } from '../guards/student.guard';
import { TeacherGuard } from '../guards/teacher.guard';
import { CourseComponent } from '../pages/course/course.component';
import { ListCourseComponent } from '../pages/list-course/list-course.component';
import { ProfileTeacherComponent } from '../pages/profile-teacher/profile-teacher.component';
import { DashboardComponent } from './dashboard.component';

const children: Routes = [
  {
    path: '',
    component: ListCourseComponent,
    canActivate: [InstitutionalGuard],
  },
  {
    path: 'materia/:code/:group',
    component: CourseComponent,
    canActivate: [TeacherGuard],
  },
  {
    path: 'perfil/:code',
    component: ProfileTeacherComponent,
    canActivate: [StudentGuard],
  },
];
const routes: Routes = [{ path: '', component: DashboardComponent, children }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
