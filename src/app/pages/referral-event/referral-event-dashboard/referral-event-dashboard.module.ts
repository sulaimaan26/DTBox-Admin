import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralEventDashboardRoutingModule } from './referral-event-dashboard-routing.module';
import { ReferralEventDashboardComponent } from './referral-event-dashboard.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';

@NgModule({
  declarations: [ReferralEventDashboardComponent],
  imports: [
    CommonModule,
    ReferralEventDashboardRoutingModule,
    ListInputTableModule,
  ],
})
export class ReferralEventDashboardModule {}
