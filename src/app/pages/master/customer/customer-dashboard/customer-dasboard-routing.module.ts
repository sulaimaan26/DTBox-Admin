import {InjectionToken, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerDashboardComponent} from './customer-dashboard.component';
import {CommonDiplayService} from "../../../../services/commondisplay.service";
import {RouteData} from "../../../../_model/header";

const COMMON_DISPLAY_SERVICE = new InjectionToken<string>("CommonDiplayService")

const routes: Routes = [
  {
    path: 'commondisplay',
    component: CustomerDashboardComponent,
    data:{
     header:{
      title:"Customer",
       breadcrumb:[
         {
           name:'Dashboard',
           isActive:true,
           link:'/master/list/customer'
         },
         {
           name:'Customer',
           isActive:false,
         },
       ],
       button:{
        link:'/master/customer/create/',
         isActive:true
       }
     },
      requiredService: COMMON_DISPLAY_SERVICE
    } as RouteData,
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    {
      provide: COMMON_DISPLAY_SERVICE,
      useClass: CommonDiplayService
    }
  ]
})
export class CustomerDasboardRoutingModule { }
