import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponCodeGenerateRoutingModule } from './coupon-code-generate-routing.module';
import { CouponCodeGenerateComponent } from './coupon-code-generate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    CouponCodeGenerateComponent
  ],
  imports: [
    CommonModule,
    CouponCodeGenerateRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class CouponCodeGenerateModule { }
