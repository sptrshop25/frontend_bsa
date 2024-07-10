import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationPhoneNumberPage } from './verification-phone-number.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationPhoneNumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationPhoneNumberPageRoutingModule {}
