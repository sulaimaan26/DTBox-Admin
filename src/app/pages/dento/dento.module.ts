import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DentoRoutingModule } from './dento-routing.module';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { DentoComponent } from './dento.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    HeaderComponent,
    DentoComponent
  ],
    imports: [
        CommonModule,
        DentoRoutingModule,
        MatTreeModule,
        MatIconModule,
        MatProgressBarModule,
        MatTooltipModule
    ]
})
export class DentoModule { }
