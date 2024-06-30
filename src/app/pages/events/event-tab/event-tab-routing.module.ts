import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventTabComponent } from './event-tab.component';

const routes: Routes = [
  {
    path: '',
    component: EventTabComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventTabRoutingModule {}
