import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerDashboardComponent } from './banner-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: BannerDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerDashboardRoutingModule {}
