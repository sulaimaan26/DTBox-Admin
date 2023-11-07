import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateLocationRoutingModule } from './create-location-routing.module';
import { CreateLocationComponent } from './create-location.component';


@NgModule({
  declarations: [
    CreateLocationComponent
  ],
  imports: [
    CommonModule,
    CreateLocationRoutingModule
  ]
})
export class CreateLocationModule { }
