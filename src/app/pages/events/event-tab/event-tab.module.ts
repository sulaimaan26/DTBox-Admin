import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventTabRoutingModule } from './event-tab-routing.module';
import { EventTabComponent } from './event-tab.component';
import { EventAnalyticsComponent } from '../event-analytics/event-analytics.component';
import { EventFormComponent } from '../event-form/event-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';
import { BotViewComponent } from '../bot-view/bot-view.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BotViewSearchComponent } from '../bot-view/bot-view-search/bot-view-search.component';
import { BotViewGenerateComponent } from '../bot-view/bot-view-generate/bot-view-generate.component';

@NgModule({
  declarations: [
    EventTabComponent,
    EventAnalyticsComponent,
    EventFormComponent,
    BotViewComponent,
    BotViewSearchComponent,
    BotViewGenerateComponent,
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
    NgSelectModule,
    FormsModule,
  ],
})
export class EventTabModule {}
