import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsResolver } from 'src/app/resolver/settings/settings-resolve';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    resolve: {
      settings: SettingsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
