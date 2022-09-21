import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'games',
    loadChildren: () => import('./pages/games/games.module').then(m => m.GamesModule),
  }, {
    path: 'explore',
    loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExplorePageModule),
  }, {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
  }, {
    path: 'tools',
    loadChildren: () => import('./pages/tools/tools.module').then(m => m.ToolsPageModule),
  }, {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
  },

  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'games',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
