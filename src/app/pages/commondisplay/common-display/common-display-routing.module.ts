import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonDisplayComponent } from './common-display.component';

const routes: Routes = [
  {
    path:'',
    component:CommonDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonDisplayRoutingModule { }
