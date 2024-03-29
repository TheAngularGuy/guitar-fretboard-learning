import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: 'custom-tuning',
    loadChildren: () => import('./pages/custom-tuning/custom-tuning.module').then(m => m.CustomTuningPageModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule),
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then(m => m.PrivacyPageModule),
  },
  {
    path: 'terms-of-use',
    loadChildren: () => import('./pages/terms-of-use/terms-of-use.module').then(m => m.TermsOfUsePageModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {
}
