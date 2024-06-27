import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReferralCodeRoutingModule } from './sales-referral-code-routing.module';
import { SalesReferralCodeComponent } from './sales-referral-code.component';

@NgModule({
  declarations: [SalesReferralCodeComponent],
  imports: [CommonModule, SalesReferralCodeRoutingModule],
})
export class SalesReferralCodeModule {}
