import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GeneralComponent} from "./general/general.component";
import {BookingStageComponent} from "./booking-stage.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OriginComponent } from './origin/origin.component';
import { DestinationComponent } from './destination/destination.component';
import { FullContainerLoadComponent } from './full-container-load/full-container-load.component';
import { FreightRelatedComponent } from './freight-related/freight-related.component';
import { AirComponent } from './air/air.component';
import { LessContainerRelatedComponent } from './less-container-related/less-container-related.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { TrashipmentComponent } from './trashipment/trashipment.component';
import {NumberseriesGeneratorModule} from "../../numberseries-generator/numberseries-generator.module";
import {SearchDropdownModule} from "../../searchdropdown/searchdropdown.module";
import {FormListInputTableModule} from "../../form-list-input-table/form-list-input-table.module";




@NgModule({
  declarations: [
    GeneralComponent,
    BookingStageComponent,
    OriginComponent,
    DestinationComponent,
    FullContainerLoadComponent,
    FreightRelatedComponent,
    AirComponent,
    LessContainerRelatedComponent,
    TrashipmentComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        MatExpansionModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NumberseriesGeneratorModule,
        SearchDropdownModule,
        FormListInputTableModule
    ],
  exports: [
    GeneralComponent,
    BookingStageComponent
  ]
})
export class BookingStageModule { }
