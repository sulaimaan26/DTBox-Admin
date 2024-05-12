import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';

@NgModule({
  declarations: [CustomerDashboardComponent],
  imports: [CommonModule, CustomerDashboardRoutingModule, ListInputTableModule],
})
export class CustomerDashboardModule {}
