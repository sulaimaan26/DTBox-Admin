import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesCodeDashboardRoutingModule } from './sales-code-dashboard-routing.module';
import { SalesCodeDashboardComponent } from './sales-code-dashboard.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';
import { AddSalesCodeDialogComponent } from '../add-sales-code-dialog/add-sales-code-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SalesCodeDashboardComponent, AddSalesCodeDialogComponent],
  imports: [
    CommonModule,
    SalesCodeDashboardRoutingModule,
    ListInputTableModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class SalesCodeDashboardModule {}
