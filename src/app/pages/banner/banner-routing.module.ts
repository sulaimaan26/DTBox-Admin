import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerDetailsResolver } from 'src/app/resolver/banner/banner';
import { BannerDropdownResolver } from 'src/app/resolver/banner/banner-dropdown.resolve';
import { BannerComponent } from './banner.component';

const routes: Routes = [
  {
    path: '',
    component: BannerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./banner-dashboard/banner-dashboard.module').then(
            (m) => m.BannerDashboardModule
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./banner-form/banner-form.module').then(
            (m) => m.BannerFormModule
          ),
        resolve: {
          dropdown: BannerDropdownResolver,
        },
      },
      {
        path: 'update/:bannerid',
        loadChildren: () =>
          import('./banner-form/banner-form.module').then(
            (m) => m.BannerFormModule
          ),
        resolve: {
          details: BannerDetailsResolver,
          dropdown: BannerDropdownResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerRoutingModule {}
