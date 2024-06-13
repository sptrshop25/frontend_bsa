import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationForgotPasswordPageRoutingModule } from './verification-forgot-password-routing.module';

import { VerificationForgotPasswordPage } from './verification-forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationForgotPasswordPageRoutingModule
  ],
  declarations: [VerificationForgotPasswordPage]
})
export class VerificationForgotPasswordPageModule {}
