import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberseriesGeneratorComponent } from './numberseries-generator.component';



@NgModule({
  declarations: [
    NumberseriesGeneratorComponent
  ],
  exports: [
    NumberseriesGeneratorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NumberseriesGeneratorModule { }
