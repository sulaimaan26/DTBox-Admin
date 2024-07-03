import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesCodeUpdateComponent } from './sales-code-update.component';

const routes: Routes = [
  {
    path: '',
    component: SalesCodeUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesCodeUpdateRoutingModule {}
