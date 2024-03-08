import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignDetailsResolver } from 'src/app/resolver/campaign/campaign';
import { CampaignComponent } from './campaign.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./campaign-dashboard/campaign-dashboard.module').then(
            (m) => m.CampaignDashboardModule
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./campaign-form/campaign-form.module').then(
            (m) => m.CampaignFormModule
          ),
      },
      {
        path: 'update/:campaignid',
        loadChildren: () =>
          import('./campaign-form/campaign-form.module').then(
            (m) => m.CampaignFormModule
          ),
        resolve: {
          details: CampaignDetailsResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignRoutingModule {}
