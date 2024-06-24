import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDisplayDashboardRoutingModule } from './common-display-dashboard-routing.module';
import { CommonDisplayDashboardComponent } from './common-display-dashboard.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';

@NgModule({
  declarations: [CommonDisplayDashboardComponent],
  imports: [
    CommonModule,
    CommonDisplayDashboardRoutingModule,
    ListInputTableModule,
  ],
})
export class CommonDisplayDashboardModule {}
