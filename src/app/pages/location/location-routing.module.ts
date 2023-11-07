import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';

const routes: Routes = [
  {
    path: '',
    component:LocationComponent,
    children: [
      {
        path: 'create',
        loadChildren: () =>
          import('./create-location/create-location-routing.module').then(
            (m) => m.CreateLocationRoutingModule
          ),
      },
      {
        path: 'update/:id',
        loadChildren: () =>
          import('./create-location/create-location-routing.module').then(
            (m) => m.CreateLocationRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
