import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BossWellnessGuard } from '../guards/boss-wellness.guard';
import { WellnessGuard } from '../guards/wellness.guard';
import { CourseDataComponent } from '../pages/course-data/course-data.component';
import { CreateUserComponent } from '../pages/create-user/create-user.component';
import { FacultiesComponent } from '../pages/faculties/faculties.component';
import { InRiskComponent } from '../pages/in-risk/in-risk.component';
import { PostulateListComponent } from '../pages/postulate-list/postulate-list.component';
import { SemesterWellnessComponent } from '../pages/semester-wellness/semester-wellness.component';
import { SemesterComponent } from '../pages/semester/semester.component';
import { SuggestionComponent } from '../pages/suggestion/suggestion.component';
import { DashboardWellnessComponent } from './dashboard-wellness.component';
import { ActivitiesComponent } from '../pages/activities/activities.component';

const children: Routes = [
  { path: '', component: FacultiesComponent, canActivate: [WellnessGuard] },
  {
    path: 'semestres/programa/:nombre',
    component: SemesterComponent,
    canActivate: [BossWellnessGuard],
  },
  {
    path: 'semestre/:programa/:numero',
    component: SemesterWellnessComponent,
    canActivate: [BossWellnessGuard],
  },
  {
    path: 'postulados/:pagina',
    component: PostulateListComponent,
    canActivate: [BossWellnessGuard],
  },
  { path: 'en-riesgo', component: InRiskComponent },
  { path: 'datos-curso', component: CourseDataComponent },
  {
    path: 'facultades',
    component: FacultiesComponent,
    canActivate: [WellnessGuard],
  },
  {
    path: 'crear-usuario',
    component: CreateUserComponent,
  },
  {
    path: 'sugerencias',
    component: SuggestionComponent,
  },
  {
    path: 'sugerencias/:pagina',
    component: SuggestionComponent,
  },
  {
    path: 'actividades',
    component: ActivitiesComponent,
  },
];

const routes: Routes = [
  { path: '', component: DashboardWellnessComponent, children },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WellnessRoutingModule {}
