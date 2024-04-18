import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralEventFormComponent } from './referral-event-form.component';

const routes: Routes = [
  {
    path: '',
    component: ReferralEventFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferralEventFormRoutingModule {}
