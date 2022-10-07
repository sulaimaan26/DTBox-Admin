import {InjectionToken, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MasterComponent} from "./master.component";
import {RouteData} from "../../../_model/header";
import {CustomerDetailsResolver} from "../../../resolver/customer/customer-details.resolver";
import {CustomerDropdownResolver} from "../../../resolver/customer/customer-dropdown.resolver";
import {TableName} from "../../../_model/TableColumn";
import {CommonDiplayService} from "../../../services/commondisplay.service";
import {CommonDisplayDetailsResolver} from "../../../resolver/commondisplay/common-display.resolve";
import {CommonDisplayDropdownResolver} from "../../../resolver/commondisplay/common-display-dropdown.resolve";


const routes: Routes = [
  {
    path:'',
    component:MasterComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('../customer/customer-dashboard/customer-dasboard.module').then( m => m.CustomerDasboardModule)
      },
      {
        path: 'commondisplay/create',
        loadChildren: () => import('../../commondisplay/common-display/common-display.module').then( m => m.CommonDisplayModule),
        resolve:{dropdown:CommonDisplayDropdownResolver}
      },
      {
        path: 'commondisplay/update/:commondisplayid',
        loadChildren: () => import('../../commondisplay/common-display/common-display.module').then( m => m.CommonDisplayModule),
        resolve:{details:CommonDisplayDetailsResolver,dropdown:CommonDisplayDropdownResolver}
      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
