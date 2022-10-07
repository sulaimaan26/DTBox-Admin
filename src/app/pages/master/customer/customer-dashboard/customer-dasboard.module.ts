import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CustomerDasboardRoutingModule } from './customer-dasboard-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {ListTableModule} from "../../../../component/list-table/list-table.module";
import { ListTableStaticModule } from 'src/app/component/list-table-static/list-table-static.module';


@NgModule({
  declarations: [
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    ListTableStaticModule,
    CustomerDasboardRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    ListTableModule
  ]
})
export class CustomerDasboardModule { }
