import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignDashboardComponent } from './campaign-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignDashboardRoutingModule {}
