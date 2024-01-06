import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponCodeGenerateRoutingModule } from './coupon-code-generate-routing.module';
import { CouponCodeGenerateComponent } from './coupon-code-generate.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CouponCodeGenerateComponent
  ],
  imports: [
    CommonModule,
    CouponCodeGenerateRoutingModule,
    ReactiveFormsModule
  ]
})
export class CouponCodeGenerateModule { }
