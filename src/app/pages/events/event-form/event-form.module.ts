import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormRoutingModule } from './event-form-routing.module';
import { EventFormComponent } from './event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [EventFormComponent],
  imports: [
    CommonModule,
    EventFormRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
  ],
})
export class EventFormModule {}
