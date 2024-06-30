import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralLogRoutingModule } from './referral-log-routing.module';
import { ReferralLogComponent } from './referral-log.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';

@NgModule({
  declarations: [ReferralLogComponent],
  imports: [
    CommonModule,
    ReferralLogRoutingModule,
    ReactiveFormsModule,
    ListInputTableModule,
  ],
  exports: [ReferralLogComponent],
})
export class ReferralLogModule {}
