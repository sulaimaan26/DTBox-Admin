import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonDisplayDashboardComponent } from './common-display-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:CommonDisplayDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonDisplayDashboardRoutingModule { }
