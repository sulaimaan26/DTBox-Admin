import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponCodeComponent } from './coupon-code.component';

const routes: Routes = [
  {
    path: '',
    component: CouponCodeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./coupon-code-dashboard/coupon-code-dashboard.module').then(
            (m) => m.CouponCodeDashboardModule
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./coupon-code-generate/coupon-code-generate.module').then(
            (m) => m.CouponCodeGenerateModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponCodeRoutingModule {}
