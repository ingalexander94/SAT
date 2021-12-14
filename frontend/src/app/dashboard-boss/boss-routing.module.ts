import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BossGuard } from '../guards/boss.guard';
import { SemesterComponent } from '../pages/semester/semester.component';
import { DashboardBossComponent } from './dashboard-boss.component';
import { SemesterCoursesComponent } from '../pages/semester-courses/semester-courses.component';

const children: Routes = [{ path: '', component: SemesterComponent }];

const routes: Routes = [
  {
    path: '',
    component: DashboardBossComponent,
    canActivate: [BossGuard],
    children,
  },
  {
    path: 'semestres-courses',
    component: SemesterCoursesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BossRoutingModule {}
