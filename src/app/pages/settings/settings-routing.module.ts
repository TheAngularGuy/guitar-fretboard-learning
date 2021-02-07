import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: 'custom-tuning',
    loadChildren: () =>
      import('./pages/custom-tuning/custom-tuning.module').then(m => m.CustomTuningPageModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about-routing.module').then(m => m.AboutPageRoutingModule),
  },  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {
}
