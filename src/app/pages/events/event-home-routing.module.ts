import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsDropdownResolver } from 'src/app/resolver/events/events-dropdown.resolve';
import { EventsDetailsResolver } from 'src/app/resolver/events/events.resolve';
import { EventHomeComponent } from './event-home.component';

const routes: Routes = [
  {
    path: '',
    component: EventHomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./event-dashboard/event-dashboard.module').then(
            (m) => m.EventDashboardModule
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./event-tab/event-tab.module').then((m) => m.EventTabModule),
        resolve: { dropdown: EventsDropdownResolver },
      },
      {
        path: 'update/:eventid',
        loadChildren: () =>
          import('./event-tab/event-tab.module').then((m) => m.EventTabModule),
        resolve: {
          details: EventsDetailsResolver,
          dropdown: EventsDropdownResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventHomeRoutingModule {}
