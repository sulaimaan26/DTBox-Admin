import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponCodeRoutingModule } from './coupon-code-routing.module';
import { CouponCodeComponent } from './coupon-code.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';

@NgModule({
  declarations: [CouponCodeComponent],
  imports: [CommonModule, CouponCodeRoutingModule, ListInputTableModule],
})
export class CouponCodeModule {}
