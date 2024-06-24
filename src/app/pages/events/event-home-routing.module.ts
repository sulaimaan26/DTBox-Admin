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
          import('./event-form/event-form.module').then(
            (m) => m.EventFormModule
          ),
        resolve: { dropdown: EventsDropdownResolver },
      },
      {
        path: 'update/:eventid',
        loadChildren: () =>
          import('./event-form/event-form.module').then(
            (m) => m.EventFormModule
          ),
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
