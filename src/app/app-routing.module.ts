import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  // path: '',
  //   loadChildren: () => {
  //     if (localStorage.getItem('authToken')) {
  //       return import('./tabs/tabs.module').then(m => m.TabsPageModule);
  //     } else {
  //       return import('./authentication/sign-in/sign-in.module').then(m => m.SignInPageModule);
  //     }
  //   }
  // },
  path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
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
    loadChildren: () => import('./pages/teacher-register/teacher-register.module').then( m => m.TeacherRegisterPageModule)
  },
  {
    path: 'teacher-register2',
    loadChildren: () => import('./pages/teacher-register2/teacher-register2.module').then( m => m.TeacherRegister2PageModule)
  },
  {
    path: 'teacher-register3',
    loadChildren: () => import('./pages/teacher-register3/teacher-register3.module').then( m => m.TeacherRegister3PageModule)
  },
  {
    path: 'kursus-saya',
    loadChildren: () => import('./pages/kursus-saya/kursus-saya.module').then( m => m.KursusSayaPageModule)
  },
  {
    path: 'kuis-detail',
    loadChildren: () => import('./pages/kuis-detail/kuis-detail.module').then( m => m.KuisDetailPageModule)
  },
  {
    path: 'shared-modul',
    loadChildren: () => import('./shared-modul/shared-modul.module').then( m => m.SharedModulPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'hasil-cari',
    loadChildren: () => import('./pages/hasil-cari/hasil-cari.module').then( m => m.HasilCariPageModule)
  },
  {
    path: 'manage-course',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'verification-forgot-password',
    loadChildren: () => import('./authentication/verification-forgot-password/verification-forgot-password.module').then( m => m.VerificationForgotPasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./authentication/verification-forgot-password/verification-forgot-password.module').then( m => m.VerificationForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./authentication/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./authentication/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'detail-course',
    loadChildren: () => import('./pages/detail-kursus/detail-kursus.module').then( m => m.DetailKursusPageModule)
  },
  {
    path: 'form-course',
    loadChildren: () => import('./pages/form-kursus/form-kursus.module').then( m => m.FormKursusPageModule)
  },
  // {
  //   path: 'detail-kursus-saya',
  //   loadChildren: () => import('./pages/detail-kursus-saya/detail-kursus-saya.module').then( m => m.DetailKursusSayaPageModule)
  // },
  {
    path: 'management-course',
    loadChildren: () => import('./pages/manajemen-kursus/manajemen-kursus.module').then( m => m.ManajemenKursusPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/pay/pay.module').then( m => m.PayPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./pages/wishlist/wishlist.module').then( m => m.WishlistPageModule)
  },
  {
    path: 'my-course',
    loadChildren: () => import('./pages/kursus-saya/kursus-saya.module').then( m => m.KursusSayaPageModule)
  },
  {
    path: 'detail-my-course',
    loadChildren: () => import('./pages/detail-kursus-saya 3/detail-kursus-saya.module').then( m => m.DetailKursusSayaPageModule)
  },
  {
    path: 'detail-material',
    loadChildren: () => import('./pages/video-player/video-player.module').then( m => m.VideoPlayerPageModule)
  },
  {
    path: 'help-center',
    loadChildren: () => import('./pages/help-center/help-center.module').then( m => m.HelpCenterPageModule)
  },
  {
    path: 'help-center',
    loadChildren: () => import('./pages/help-center/help-center.module').then( m => m.HelpCenterPageModule)
  },
  {
    path: 'pay-checkout',
    loadChildren: () => import('./pages/pay-checkout/pay-checkout.module').then( m => m.PayCheckoutPageModule)
  },
  {
    path: 'teacher-profile',
    loadChildren: () => import('./pages/teacher-profile/teacher-profile.module').then( m => m.TeacherProfilePageModule)
  },
  {
    path: 'receipt',
    loadChildren: () => import('./pages/receipt/receipt.module').then( m => m.ReceiptPageModule)
  },
  {
    path: 'tarik-saldo',
    loadChildren: () => import('./pages/tarik-saldo/tarik-saldo.module').then( m => m.TarikSaldoPageModule)
  },
  {
    path: 'notifikasi',
    loadChildren: () => import('./pages/notifikasi/notifikasi.module').then( m => m.NotifikasiPageModule)
  },
  {
    path: 'change-profile',
    loadChildren: () => import('./pages/change-profile/change-profile.module').then( m => m.ChangeProfilePageModule)
  },
  {
    path: 'edit-teacher-profile',
    loadChildren: () => import('./pages/edit-teacher/edit-teacher.module').then( m => m.EditTeacherPageModule)
  },
  {
    path: 'edit-course',
    loadChildren: () => import('./pages/edit-course/edit-course.module').then( m => m.EditCoursePageModule)
  },
  {
    path: 'edit-course',
    loadChildren: () => import('./pages/edit-course/edit-course.module').then( m => m.EditCoursePageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FAQPageModule)
  },
  {
    path: 'student-manajement',
    loadChildren: () => import('./pages/student-manajement/student-manajement.module').then( m => m.StudentManajementPageModule)
  },
  {
    path: 'financial',
    loadChildren: () => import('./pages/financial/financial.module').then( m => m.FinancialPageModule)
  },
  {
    path: 'verification-phone-number',
    loadChildren: () => import('./authentication/verification-phone-number/verification-phone-number.module').then( m => m.VerificationPhoneNumberPageModule)
  },
  {
    path: 'kuis-detail',
    loadChildren: () => import('./pages/kuis-detail/kuis-detail.module').then( m => m.KuisDetailPageModule)
  },
  {
    path: 'kuis-review',
    loadChildren: () => import('./pages/quiz-review/quiz-review.module').then( m => m.QuizReviewPageModule)
  },
  {
    path: 'start-quiz',
    loadChildren: () => import('./pages/before-quiz/before-quiz.module').then( m => m.BeforeQuizPageModule)
  },
  {
    path: 'do-quiz',
    loadChildren: () => import('./pages/student-quiz/student-quiz.module').then( m => m.StudentQuizPageModule)
  }
];
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
