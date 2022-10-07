import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CurrencyCodeHomeRoutingModule
} from "../../pages/master/currencycode/currency-code-home/currency-code-home-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormListInputTableComponent} from "./form-list-input-table.component";


@NgModule({
  declarations: [
    FormListInputTableComponent
  ],
  exports: [
    FormListInputTableComponent
  ],
  imports: [
    CommonModule,
    CurrencyCodeHomeRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ]
})
export class  FormListInputTableModule { }
