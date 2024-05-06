import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { CommonDiplayService } from '../../../../services/commondisplay.service';
import { RouteData } from '../../../../_model/header';
import { EventService } from 'src/app/services/events.service';
import { LocationService } from 'src/app/services/location.service';


const EVENTS_SERVICE = new InjectionToken<string>('EventService');
const LOCATION_SERVICE = new InjectionToken<string>('LocationService');

const routes: Routes = [
  {
    path: 'commondisplay',
    component: CustomerDashboardComponent
  },

  // {
  //   path: 'location',
  //   component: CustomerDashboardComponent,
  //   data: {
  //     header: {
  //       title: 'Location',
  //       breadcrumb: [
  //         {
  //           name: 'Dashboard',
  //           isActive: true,
  //           link: '/master/list/events',
  //         },
  //         {
  //           name: 'Events',
  //           isActive: false,
  //         },
  //       ],
  //       button: {
  //         link: '/admin/location/create',
  //         isActive: true,
  //       },
  //     },
  //     requiredService: LOCATION_SERVICE,
  //   } as RouteData,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [

    {
      provide: EVENTS_SERVICE,
      useClass: EventService,
    },
    {
      provide: LOCATION_SERVICE,
      useClass: LocationService,
    },
  ],
})
export class CustomerDasboardRoutingModule {}
