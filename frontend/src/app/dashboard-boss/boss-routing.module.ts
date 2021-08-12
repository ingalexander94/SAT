import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BossGuard } from '../guards/boss.guard';
import { SemesterComponent } from '../pages/semester/semester.component';
import { DashboardBossComponent } from './dashboard-boss.component';

const children: Routes = [
  { path: '', component: SemesterComponent, canActivate: [BossGuard] },
];

const routes: Routes = [
  {
    path: '',
    component: DashboardBossComponent,
    children,
    canActivate: [BossGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BossRoutingModule {}
