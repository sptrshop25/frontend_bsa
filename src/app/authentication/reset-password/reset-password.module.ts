import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';

import { AlertResetPasswordComponent } from '../../alert-reset-password/alert-reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageRoutingModule
  ],
  declarations: [ResetPasswordPage, AlertResetPasswordComponent],
})
export class ResetPasswordPageModule {}
