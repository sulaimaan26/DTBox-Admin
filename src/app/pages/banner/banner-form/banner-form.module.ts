import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerFormRoutingModule } from './banner-form-routing.module';
import { BannerFormComponent } from './banner-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [BannerFormComponent],
  imports: [
    CommonModule,
    BannerFormRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
  ],
})
export class BannerFormModule {}
