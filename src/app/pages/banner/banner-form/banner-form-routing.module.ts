import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerFormComponent } from './banner-form.component';

const routes: Routes = [
  {
    path: '',
    component: BannerFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerFormRoutingModule {}
