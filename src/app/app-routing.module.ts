import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/commondisplay',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
    pathMatch: 'full',
  },
  {
    path: 'user/login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/dento/dento.module').then((m) => m.DentoModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user/forgotpassword',
    loadChildren: () =>
      import('./pages/login/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
