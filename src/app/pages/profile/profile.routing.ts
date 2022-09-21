import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/profile-data/profile-data.module').then(m => m.ProfileDataPageModule),
    // canActivate: [AuthGuardService]
  },
  {
    path: 'note-detail/:note',
    loadChildren: () => import('./pages/note-detail/note-detail.module').then(m => m.NoteDetailPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'progression',
    loadChildren: () => import('./pages/progression/progression.module').then(m => m.ProgressionPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {
}
