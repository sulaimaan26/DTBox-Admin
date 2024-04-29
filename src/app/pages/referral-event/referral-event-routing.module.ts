import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralEventDetailsResolver } from 'src/app/resolver/referralevent/referralevent';
import { ReferralEventComponent } from './referral-event.component';

const routes: Routes = [
  {
    path: '',
    component: ReferralEventComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            './referral-event-dashboard/referral-event-dashboard.module'
          ).then((m) => m.ReferralEventDashboardModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./referral-event-form/referral-event-form.module').then(
            (m) => m.ReferralEventFormModule
          ),
      },
      {
        path: 'update/:referraleventid',
        loadChildren: () =>
          import('./referral-event-form/referral-event-form.module').then(
            (m) => m.ReferralEventFormModule
          ),
        resolve: {
          details: ReferralEventDetailsResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferralEventRoutingModule {}
