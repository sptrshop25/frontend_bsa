import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    data: { showTab: true }
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./authentication/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
  path: 'sign-up',
    loadChildren: () => import('./authentication/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tab-kursus',
    loadChildren: () => import('./tab-kursus/tab-kursus.module').then( m => m.TabKursusPageModule)
  },
  {
    path: 'tab-history',
    loadChildren: () => import('./tab-history/tab-history.module').then( m => m.TabHistoryPageModule)
  },
  {
    path: 'tab-profile',
    loadChildren: () => import('./tab-profile/tab-profile.module').then( m => m.TabProfilePageModule)
  },
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
