import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { LoginAdminComponent } from './pages/auth/login-admin/login-admin.component';
import { LoginStudentComponent } from './pages/auth/login-student/login-student.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RecoveryPasswordComponent } from './pages/auth/recovery-password/recovery-password.component';
import { ErrorComponent } from './pages/error/error.component';
import { ListReportsComponent } from './pages/list-reports/list-reports.component';

const routes: Routes = [
  {
    path: 'docente/iniciar-sesion',
    component: LoginComponent,
  },
  {
    path: 'estudiante/iniciar-sesion',
    component: LoginStudentComponent,
  },
  {
    path: 'administrativo/iniciar-sesion',
    component: LoginAdminComponent,
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'auth/recovery_password/:token',
    component: RecoveryPasswordComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'reportes',
    component: ListReportsComponent,
  },
  {
    path: 'docente',
    loadChildren: () =>
      import('./dashboard/teacher.module').then((m) => m.TeacherModule),
  },
  {
    path: 'estudiante',
    loadChildren: () =>
      import('./dashboard-student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'vicerrector',
    loadChildren: () =>
      import('./dashboard-wellness/wellness.module').then(
        (m) => m.WellnessModule
      ),
  },
  {
    path: 'jefe',
    loadChildren: () =>
      import('./dashboard-boss/boss.module').then((m) => m.BossModule),
  },
  {
    path: 'administrativo',
    loadChildren: () =>
      import('./dashboard-psychology/psychology.module').then(
        (m) => m.PsychologyModule
      ),
  },
  {
    path: '**',
    redirectTo: 'estudiante/iniciar-sesion',
  },
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
