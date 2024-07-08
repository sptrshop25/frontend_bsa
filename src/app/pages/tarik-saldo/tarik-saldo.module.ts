import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarikSaldoPageRoutingModule } from './tarik-saldo-routing.module';

import { TarikSaldoPage } from './tarik-saldo.page';

import { CurrencyFormatPipe } from './currency-format.pipe';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarikSaldoPageRoutingModule
  ],
  declarations: [TarikSaldoPage, CurrencyFormatPipe, ConfirmationModalComponent]
})
export class TarikSaldoPageModule {}
