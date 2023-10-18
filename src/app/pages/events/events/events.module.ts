import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventAnalyticsComponent } from '../event-analytics/event-analytics.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';

@NgModule({
  declarations: [EventsComponent, EventFormComponent, EventAnalyticsComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    ListInputTableModule
  ],
})
export class EventsModule {}
