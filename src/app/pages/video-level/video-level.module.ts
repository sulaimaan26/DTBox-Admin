import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoLevelRoutingModule } from './video-level-routing.module';
import { VideoLevelComponent } from './video-level.component';
import { ListInputTableModule } from 'src/app/component/list-input-table/list-input-table.module';


@NgModule({
  declarations: [
    VideoLevelComponent
  ],
  imports: [
    CommonModule,
    VideoLevelRoutingModule,
    ListInputTableModule
  ]
})
export class VideoLevelModule { }
