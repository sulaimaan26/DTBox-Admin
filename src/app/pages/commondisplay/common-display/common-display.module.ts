import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDisplayRoutingModule } from './common-display-routing.module';
import { CommonDisplayComponent } from './common-display.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    CommonDisplayComponent
  ],
    imports: [
        CommonModule,
        CommonDisplayRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule
    ]
})
export class CommonDisplayModule { }
