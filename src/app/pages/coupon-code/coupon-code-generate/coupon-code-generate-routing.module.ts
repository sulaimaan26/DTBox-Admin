import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponCodeComponent } from '../coupon-code.component';
import { CouponCodeGenerateComponent } from './coupon-code-generate.component';

const routes: Routes = [
  {
    path: '',
    component: CouponCodeGenerateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponCodeGenerateRoutingModule {}
