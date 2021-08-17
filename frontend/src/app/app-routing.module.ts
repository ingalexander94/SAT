import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { BossWellnessGuard } from './guards/boss-wellness.guard';
import { PrivateGuard } from './guards/private.guard';
import { PublicGuard } from './guards/public.guard';
import { AdministrativeProfileComponent } from './pages/administrative-profile/administrative-profile.component';
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
    canActivate: [PublicGuard],
  },
  {
    path: 'estudiante/iniciar-sesion',
    component: LoginStudentComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'administrativo/iniciar-sesion',
    component: LoginAdminComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'auth/recovery_password/:token',
    component: RecoveryPasswordComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'administrativo/perfil',
    component: AdministrativeProfileComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'reportes',
    component: ListReportsComponent,
    canActivate: [BossWellnessGuard],
  },
  {
    path: 'docente',
    loadChildren: () =>
      import('./dashboard/teacher.module').then((m) => m.TeacherModule),
    canActivate: [PrivateGuard],
  },
  {
    path: 'estudiante',
    loadChildren: () =>
      import('./dashboard-student/student.module').then((m) => m.StudentModule),
    canActivate: [PrivateGuard],
  },
  {
    path: 'vicerrector',
    loadChildren: () =>
      import('./dashboard-wellness/wellness.module').then(
        (m) => m.WellnessModule
      ),
    canActivate: [PrivateGuard],
  },
  {
    path: 'jefe',
    loadChildren: () =>
      import('./dashboard-boss/boss.module').then((m) => m.BossModule),
    canActivate: [PrivateGuard],
  },
  {
    path: 'psicologo',
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
