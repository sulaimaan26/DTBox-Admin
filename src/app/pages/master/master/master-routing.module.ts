import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';
import { RouteData } from '../../../_model/header';
import { CustomerDetailsResolver } from '../../../resolver/customer/customer-details.resolver';
import { CustomerDropdownResolver } from '../../../resolver/customer/customer-dropdown.resolver';
import { TableName } from '../../../_model/TableColumn';
import { CommonDiplayService } from '../../../services/commondisplay.service';
import { CommonDisplayDetailsResolver } from '../../../resolver/commondisplay/common-display.resolve';
import { CommonDisplayDropdownResolver } from '../../../resolver/commondisplay/common-display-dropdown.resolve';
import { EventsDropdownResolver } from 'src/app/resolver/events/events-dropdown.resolve';
import { EventsDetailsResolver } from 'src/app/resolver/events/events.resolve';
import { CustomerDashboardComponent } from '../customer/customer-dashboard/customer-dashboard.component';
import { EventService } from 'src/app/services/events.service';

const EVENTS_SERVICE = new InjectionToken<string>('EventService');
const COMMON_DISPLAY_SERVICE = new InjectionToken<string>(
  'CommonDiplayService'
);
const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import(
            '../customer/customer-dashboard/customer-dasboard.module'
          ).then((m) => m.CustomerDasboardModule),
      },
      {
        path: 'commondisplay/create',
        loadChildren: () =>
          import(
            '../../commondisplay/common-display/common-display.module'
          ).then((m) => m.CommonDisplayModule),
        resolve: { dropdown: CommonDisplayDropdownResolver },
      },
      {
        path: 'commondisplay/update/:commondisplayid',
        loadChildren: () =>
          import(
            '../../commondisplay/common-display/common-display.module'
          ).then((m) => m.CommonDisplayModule),
        resolve: {
          details: CommonDisplayDetailsResolver,
          dropdown: CommonDisplayDropdownResolver,
        },
      },
      // {
      //   path: 'events/create',
      //   loadChildren: () =>
      //     import('../../events/events/events.module').then(
      //       (m) => m.EventsModule
      //     ),
      //   resolve: { dropdown: EventsDropdownResolver },
      // },
      // {
      //   path: 'events/update/:eventid',
      //   loadChildren: () =>
      //     import('../../events/events/events.module').then(
      //       (m) => m.EventsModule
      //     ),
      //   resolve: {
      //     details: EventsDetailsResolver,
      //     dropdown: EventsDropdownResolver,
      //   },
      // },
      {
        path: 'settings',
        loadChildren: () =>
          import('../../settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'location',
        loadChildren: () =>
          import('../../location/location.module').then(
            (m) => m.LocationModule
          ),
      },
      {
        path: 'videolevel',
        loadChildren: () =>
          import('../../video-level/video-level.module').then(
            (m) => m.VideoLevelModule
          ),
      },
      {
        path: 'couponcode',
        loadChildren: () =>
          import('../../coupon-code/coupon-code.module').then(
            (m) => m.CouponCodeModule
          ),
      },
      {
        path: 'banner',
        loadChildren: () =>
          import('../../banner/banner.module').then((m) => m.BannerModule),
      },
      {
        path: 'campaign',
        loadChildren: () =>
          import('../../campaign/campaign.module').then(
            (m) => m.CampaignModule
          ),
      },
      {
        path: 'referralevent',
        loadChildren: () =>
          import('../../referral-event/referral-event.module').then(
            (m) => m.ReferralEventModule
          ),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('../../customer/customer.module').then(
            (m) => m.CustomerModule
          ),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('../../events/event-home.module').then(
            (m) => m.EventHomeModule
          ),
        // component: CustomerDashboardComponent,
        // data: {
        //   requiredService: EVENTS_SERVICE,
        // } as RouteData,
      },
      {
        path: 'commondisplay',
        loadChildren: () =>
          import(
            '../../commondisplay/common-display-home/common-display-home.module'
          ).then((m) => m.CommonDisplayHomeModule),
      },
      {
        path: 'salesreferralcode',
        loadChildren: () =>
          import('../../sales-referral-code/sales-referral-code.module').then(
            (m) => m.SalesReferralCodeModule
          ),
      },
    ],
  },
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
      provide: COMMON_DISPLAY_SERVICE,
      useClass: CommonDiplayService,
    },
  ],
})
export class MasterRoutingModule {}
