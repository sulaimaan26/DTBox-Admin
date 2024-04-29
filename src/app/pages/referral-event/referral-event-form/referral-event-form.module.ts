import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralEventFormRoutingModule } from './referral-event-form-routing.module';
import { ReferralEventFormComponent } from './referral-event-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReferralEventFormComponent],
  imports: [CommonModule, ReferralEventFormRoutingModule, ReactiveFormsModule],
})
export class ReferralEventFormModule {}
