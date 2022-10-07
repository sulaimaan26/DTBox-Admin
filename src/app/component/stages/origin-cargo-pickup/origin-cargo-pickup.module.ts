import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OriginCargoPickupComponent} from "./origin-cargo-pickup.component";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatNativeDateModule} from "@angular/material/core";
import {NumberseriesGeneratorModule} from "../../numberseries-generator/numberseries-generator.module";
import {FormListInputTableModule} from "../../form-list-input-table/form-list-input-table.module";



@NgModule({
  declarations: [
    OriginCargoPickupComponent
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
        FormListInputTableModule
    ],
  exports: [
    OriginCargoPickupComponent
  ]
})
export class OriginCargoPickupModule { }
