import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'tab',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
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
    path: 'search-course',
    loadChildren: () => import('./pages/search-course/search-course.module').then( m => m.SearchCoursePageModule)
  },
  {
    path: 'filter-modal',
    loadChildren: () => import('./filter-modal/filter-modal.module').then( m => m.FilterModalPageModule)
  },
  {
    path: 'teacher-register',
    loadChildren: () => import('./pages/search-course/teacher-register/teacher-register.module').then( m => m.TeacherRegisterPageModule)
  },
  {
    path: 'teacher-register2',
    loadChildren: () => import('./pages/search-course/teacher-register2/teacher-register2.module').then( m => m.TeacherRegister2PageModule)
  },
  {
    path: 'teacher-register3',
    loadChildren: () => import('./pages/search-course/teacher-register3/teacher-register3.module').then( m => m.TeacherRegister3PageModule)
  },
  {
    path: 'kursus-saya',
    loadChildren: () => import('./pages/search-course/kursus-saya/kursus-saya.module').then( m => m.KursusSayaPageModule)
  },
  {
    path: 'kuis-detail',
    loadChildren: () => import('./pages/search-course/kuis-detail/kuis-detail.module').then( m => m.KuisDetailPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/search-course/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
];
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
