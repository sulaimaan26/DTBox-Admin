import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonDisplayDropdownResolver } from 'src/app/resolver/commondisplay/common-display-dropdown.resolve';
import { CommonDisplayDetailsResolver } from 'src/app/resolver/commondisplay/common-display.resolve';
import { CommonDisplayHomeComponent } from './common-display-home.component';

const routes: Routes = [
  {
    path: '',
    component: CommonDisplayHomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            '../common-display-dashboard/common-display-dashboard.module'
          ).then((m) => m.CommonDisplayDashboardModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('../common-display/common-display.module').then(
            (m) => m.CommonDisplayModule
          ),
        resolve: { dropdown: CommonDisplayDropdownResolver },
      },
      {
        path: 'commondisplay/update/:commondisplayid',
        loadChildren: () =>
          import('../common-display/common-display.module').then(
            (m) => m.CommonDisplayModule
          ),
        resolve: {
          details: CommonDisplayDetailsResolver,
          dropdown: CommonDisplayDropdownResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonDisplayHomeRoutingModule {}
