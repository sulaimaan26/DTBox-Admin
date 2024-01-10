import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponCodeDashboardComponent } from './coupon-code-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:CouponCodeDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponCodeDashboardRoutingModule { }
