import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from "@angular/material/select";
import {SearchdropdownComponent} from "./searchdropdown.component";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {ReactiveFormsModule} from "@angular/forms";
import {ListTableModule} from "../list-table/list-table.module";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    SearchdropdownComponent
  ],
  exports: [
    SearchdropdownComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    ListTableModule,
    MatDialogModule
  ]
})
export class SearchDropdownModule { }
