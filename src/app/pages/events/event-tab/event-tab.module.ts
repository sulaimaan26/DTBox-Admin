import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventTabRoutingModule } from './event-tab-routing.module';
import { EventTabComponent } from './event-tab.component';
import { EventAnalyticsComponent } from '../event-analytics/event-analytics.component';
import { EventFormComponent } from '../event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';

@NgModule({
  declarations: [
    EventTabComponent,
    EventAnalyticsComponent,
    EventFormComponent,
  ],
  imports: [
    CommonModule,
    EventTabRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    ListInputTableModule,
    MatExpansionModule,
  ],
})
export class EventTabModule {}
