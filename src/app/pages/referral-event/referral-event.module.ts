import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralEventRoutingModule } from './referral-event-routing.module';
import { ReferralEventComponent } from './referral-event.component';

@NgModule({
  declarations: [ReferralEventComponent],
  imports: [CommonModule, ReferralEventRoutingModule],
})
export class ReferralEventModule {}
