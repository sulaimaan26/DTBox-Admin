import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationmsgComponent } from './validationmsg.component';


@NgModule({
  declarations: [ValidationmsgComponent],
  imports: [
    CommonModule
  ],
  exports:[
    ValidationmsgComponent
  ]
})
export class ValidationmsgModule { }
