import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDisplayHomeRoutingModule } from './common-display-home-routing.module';
import { CommonDisplayHomeComponent } from './common-display-home.component';


@NgModule({
  declarations: [
    CommonDisplayHomeComponent
  ],
  imports: [
    CommonModule,
    CommonDisplayHomeRoutingModule
  ]
})
export class CommonDisplayHomeModule { }
