import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponCodeDashboardRoutingModule } from './coupon-code-dashboard-routing.module';
import { CouponCodeDashboardComponent } from './coupon-code-dashboard.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';


@NgModule({
  declarations: [
    CouponCodeDashboardComponent
  ],
  imports: [
    CommonModule,
    CouponCodeDashboardRoutingModule,
    ListInputTableModule
  ]
})
export class CouponCodeDashboardModule { }
