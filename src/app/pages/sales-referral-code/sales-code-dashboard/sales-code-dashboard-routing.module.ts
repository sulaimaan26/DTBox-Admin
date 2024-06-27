import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesCodeDashboardComponent } from './sales-code-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: SalesCodeDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MatDialogModule],
})
export class SalesCodeDashboardRoutingModule {}
