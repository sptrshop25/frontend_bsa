import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailKursusPageRoutingModule } from './detail-kursus-routing.module';

import { DetailKursusPage } from './detail-kursus.page';
import { CurrencyFormatPipe } from './currency-format.pipe';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailKursusPageRoutingModule
  ],
  declarations: [DetailKursusPage, CurrencyFormatPipe, CustomAlertComponent],
})
export class DetailKursusPageModule {}
