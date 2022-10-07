import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessageComponent } from './toast-message.component';



@NgModule({
  declarations: [
    ToastMessageComponent
  ],
  exports:[ToastMessageComponent],
  imports: [
    CommonModule
  ]
})
export class ToastMessageModule { }
