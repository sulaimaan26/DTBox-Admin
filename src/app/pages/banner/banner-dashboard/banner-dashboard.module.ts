import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerDashboardRoutingModule } from './banner-dashboard-routing.module';
import { BannerDashboardComponent } from './banner-dashboard.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';

@NgModule({
  declarations: [BannerDashboardComponent],
  imports: [CommonModule, BannerDashboardRoutingModule, ListInputTableModule],
})
export class BannerDashboardModule {}
