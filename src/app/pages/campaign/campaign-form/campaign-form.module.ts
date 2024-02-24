import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignFormRoutingModule } from './campaign-form-routing.module';
import { CampaignFormComponent } from './campaign-form.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CampaignFormComponent],
  imports: [
    CommonModule,
    CampaignFormRoutingModule,
    ListInputTableModule,
    ReactiveFormsModule,
  ],
})
export class CampaignFormModule {}
