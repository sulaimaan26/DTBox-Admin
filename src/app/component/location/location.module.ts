import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LocationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[LocationComponent]
})
export class LocationModule { }
