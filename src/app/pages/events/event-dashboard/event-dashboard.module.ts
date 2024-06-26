import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDashboardRoutingModule } from './event-dashboard-routing.module';
import { EventDashboardComponent } from './event-dashboard.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';

@NgModule({
  declarations: [EventDashboardComponent],
  imports: [CommonModule, EventDashboardRoutingModule, ListInputTableModule],
})
export class EventDashboardModule {}
