import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignDashboardRoutingModule } from './campaign-dashboard-routing.module';
import { CampaignDashboardComponent } from './campaign-dashboard.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';

@NgModule({
  declarations: [CampaignDashboardComponent],
  imports: [CommonModule, CampaignDashboardRoutingModule, ListInputTableModule],
})
export class CampaignDashboardModule {}
