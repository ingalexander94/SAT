import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadStudentGuard } from '../guards/load-student.guard';
import { ChatAdminComponent } from '../pages/chat-admin/chat-admin.component';
import { DashboardStudentComponent } from './dashboard-student.component';

const children: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./children/children.module').then((m) => m.ChildrenModule),
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
