import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { DentoComponent } from './dento.component';
import {RouteData} from "../../_model/header";
import {CustomerDetailsResolver} from "../../resolver/customer/customer-details.resolver";
import {CustomerDropdownResolver} from "../../resolver/customer/customer-dropdown.resolver";

const routes: Routes = [
  {
    path: '',
    component: DentoComponent,
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full',
      },
      {
        path: 'admin',
        loadChildren: () => import('../../pages/master/master/master.module').then( m => m.MasterModule)
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentoRoutingModule {}
