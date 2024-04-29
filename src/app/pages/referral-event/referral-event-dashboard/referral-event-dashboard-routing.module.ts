import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralEventDashboardComponent } from './referral-event-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ReferralEventDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferralEventDashboardRoutingModule {}
