import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesCodeUpdateRoutingModule } from './sales-code-update-routing.module';
import { SalesCodeUpdateComponent } from './sales-code-update.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SalesCodeUpdateComponent],
  imports: [
    CommonModule,
    SalesCodeUpdateRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class SalesCodeUpdateModule {}
