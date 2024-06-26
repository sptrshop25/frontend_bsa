import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayCheckoutPageRoutingModule } from './pay-checkout-routing.module';

import { PayCheckoutPage } from './pay-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayCheckoutPageRoutingModule
  ],
  declarations: [PayCheckoutPage]
})
export class PayCheckoutPageModule {}
