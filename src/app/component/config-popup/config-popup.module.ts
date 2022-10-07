import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigPopupComponent } from './config-popup.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ConfigPopupComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
  exports:[
    ConfigPopupComponent
  ],
})
export class ConfigPopupModule { }
