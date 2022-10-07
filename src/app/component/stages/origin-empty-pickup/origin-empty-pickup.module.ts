import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OriginEmptyPickupComponent} from "./origin-empty-pickup.component";
import { EmptySurveyComponent } from './empty-survey/empty-survey.component';
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {EmptyCargoComponent} from "./empty-cargo/empty-cargo.component";
import {FormListInputTableModule} from "../../form-list-input-table/form-list-input-table.module";



@NgModule({
  declarations: [
    OriginEmptyPickupComponent,
    EmptySurveyComponent,
    EmptyCargoComponent
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
        FormListInputTableModule,

    ]
})
export class OriginEmptyPickupModule { }
