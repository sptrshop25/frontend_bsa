import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabKursusPageRoutingModule } from './tab-kursus-routing.module';

import { TabKursusPage } from './tab-kursus.page';

import { CurrencyFormatPipe } from './currency-format.pipe';

import { SharedModulPageModule } from '../shared-modul/shared-modul.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabKursusPageRoutingModule,
    SharedModulPageModule
  ],
  declarations: [TabKursusPage, CurrencyFormatPipe],
})
export class TabKursusPageModule {}
