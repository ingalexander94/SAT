import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SemesterComponent } from '../pages/semester/semester.component';
import { DashboardBossComponent } from './dashboard-boss.component';

const children: Routes = [{ path: '', component: SemesterComponent }];

const routes: Routes = [
  {
    path: '',
    component: DashboardBossComponent,
    children,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BossRoutingModule {}
