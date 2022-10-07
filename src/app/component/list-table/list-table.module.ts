import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListTableComponent} from "./list-table.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {
  CustomerDasboardRoutingModule
} from "../../pages/master/customer/customer-dashboard/customer-dasboard-routing.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ListTableComponent
  ],
    imports: [
        CommonModule,
        CustomerDasboardRoutingModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        DragDropModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatSelectModule,
        FormsModule,
    ],
  exports:[
    ListTableComponent
  ]
})
export class ListTableModule { }
