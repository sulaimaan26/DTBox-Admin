import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventHomeRoutingModule } from './event-home-routing.module';
import { EventHomeComponent } from './event-home.component';
import { BotViewGenerateComponent } from './bot-view/bot-view-generate/bot-view-generate.component';

@NgModule({
  declarations: [EventHomeComponent],
  imports: [CommonModule, EventHomeRoutingModule],
})
export class EventHomeModule {}
