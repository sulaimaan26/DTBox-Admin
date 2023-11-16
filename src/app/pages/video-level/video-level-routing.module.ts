import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoLevelComponent } from './video-level.component';

const routes: Routes = [
  {
    path:'',
    component:VideoLevelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoLevelRoutingModule { }
