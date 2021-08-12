import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativeGuard } from '../guards/administrative.guard';
import { ScheduleComponent } from '../pages/schedule/schedule.component';
import { DashboardPsychologyComponent } from './dashboard-psychology.component';

const children: Routes = [
  { path: '', component: ScheduleComponent },
  {
    path: ':pagina',
    component: ScheduleComponent,
    canActivate: [AdministrativeGuard],
  },
];

const routes: Routes = [
  { path: '', component: DashboardPsychologyComponent, children },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsychologyRoutingModule {}
