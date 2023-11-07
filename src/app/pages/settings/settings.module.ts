import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SettingsComponent, NotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
