import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesReferralCodeDropdownResolver } from 'src/app/resolver/salesreferralcode/sales-code-dropdown';
import { SalesReferralCodeResolver } from 'src/app/resolver/salesreferralcode/sales-code-info';
import { SalesReferralCodeComponent } from './sales-referral-code.component';

const routes: Routes = [
  {
    path: '',
    component: SalesReferralCodeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./sales-code-dashboard/sales-code-dashboard.module').then(
            (m) => m.SalesCodeDashboardModule
          ),
      },
      {
        path: 'update/:id',
        loadChildren: () =>
          import('./sales-code-update/sales-code-update.module').then(
            (m) => m.SalesCodeUpdateModule
          ),
        resolve: {
          data: SalesReferralCodeResolver,
          dropdown: SalesReferralCodeDropdownResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesReferralCodeRoutingModule {}
