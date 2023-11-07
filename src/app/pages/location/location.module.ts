import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { LocationDashboardComponent } from './location-dashboard/location-dashboard.component';


@NgModule({
  declarations: [
    LocationComponent,
    LocationDashboardComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ListInputTableModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
  ]
})
export class LocationModule { }
