import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationForgotPasswordPage } from './verification-forgot-password.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationForgotPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationForgotPasswordPageRoutingModule {}
