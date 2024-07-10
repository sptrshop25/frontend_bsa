import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationPhoneNumberPageRoutingModule } from './verification-phone-number-routing.module';

import { VerificationPhoneNumberPage } from './verification-phone-number.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationPhoneNumberPageRoutingModule
  ],
  declarations: [VerificationPhoneNumberPage]
})
export class VerificationPhoneNumberPageModule {}
