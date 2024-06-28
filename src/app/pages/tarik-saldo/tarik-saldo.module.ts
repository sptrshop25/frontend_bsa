import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarikSaldoPageRoutingModule } from './tarik-saldo-routing.module';

import { TarikSaldoPage } from './tarik-saldo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarikSaldoPageRoutingModule
  ],
  declarations: [TarikSaldoPage]
})
export class TarikSaldoPageModule {}
