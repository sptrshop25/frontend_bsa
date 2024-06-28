import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarikSaldoPage } from './tarik-saldo.page';

const routes: Routes = [
  {
    path: '',
    component: TarikSaldoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarikSaldoPageRoutingModule {}
