import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadStudentGuard } from '../guards/load-student.guard';
import { ActivitiesStudentComponent } from '../pages/activities-student/activities-student.component';
import { ChatAdminComponent } from '../pages/chat-admin/chat-admin.component';
import { DashboardStudentComponent } from './dashboard-student.component';

const children: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./children/children.module').then((m) => m.ChildrenModule),
  },
  {
    path: 'listado-actividades',
    component: ActivitiesStudentComponent,
  },
  {
    path: 'chat-admin/:document',
    component: ChatAdminComponent,
  },
  { path: '**', redirectTo: '' },
];

const routes: Routes = [
  {
    path: '',
    component: DashboardStudentComponent,
    children,
    canActivate: [LoadStudentGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardStudentRoutingModule {}
