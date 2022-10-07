import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigHomeComponent } from '../config-home/config-home.component';
import { ConfirmDialogComponent } from './confirm-dialog.component';



@NgModule({
  declarations: [
    ConfigHomeComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ConfirmDialogModule { }
