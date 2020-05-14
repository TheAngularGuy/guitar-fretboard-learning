import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'games',
  loadChildren: () => import('./pages/games/games.module')
    .then(m => m.GamesModule),
}, {
  path: 'settings',
  loadChildren: () => import('./pages/settings/settings.module')
    .then(m => m.SettingsPageModule),
}, {
  path: 'profile',
  loadChildren: () => import('./pages/profile/profile.module')
    .then(m => m.ProfilePageModule),
}, {
  path: 'about',
  loadChildren: () => import('./pages/settings/pages/about/about.module')
    .then(m => m.AboutPageModule),
}, {
  path: 'explore',
  loadChildren: () =>
    import('./pages/explore/explore.module').then(m => m.ExplorePageModule),
}, {
  path: 'lost',
  loadChildren: () => import('./pages/lost/lost.module')
    .then(m => m.LostPageModule),
}, {
  path: 'tools',
  loadChildren: () => import('./pages/tools/tools.module').then(m => m.ToolsPageModule),
},
];

const redirections: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'lost',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot([...routes, ...redirections], {
      // preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
