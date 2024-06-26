import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayCheckoutPage } from './pay-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: PayCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayCheckoutPageRoutingModule {}
