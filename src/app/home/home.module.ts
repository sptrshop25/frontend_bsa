import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { CurrencyFormatPipe } from './currency-format.pipe';

import { SharedModulPageModule } from '../shared-modul/shared-modul.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModulPageModule,
  ],
  declarations: [HomePage, CurrencyFormatPipe],
})
export class HomePageModule {}
