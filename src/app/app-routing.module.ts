import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'explore',
    loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExplorePageModule),
  },
  {
    path: 'identify',
    loadChildren: () => import('./pages/identify/identify.module').then(m => m.IdentifyPageModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule),
  },
  {
    path: 'lost',
    loadChildren: () => import('./pages/lost/lost.module').then(m => m.LostPageModule),
  },

  {
    path: 'locate-games',
    loadChildren: () =>
      import('./pages/locate-games/locate-games.module').then(m => m.LocateGamesPageModule),
  },
];

const redirections: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'lost',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot([...routes, ...redirections], { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
