import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabKursusPageRoutingModule } from './tab-kursus-routing.module';

import { TabKursusPage } from './tab-kursus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabKursusPageRoutingModule
  ],
  declarations: [TabKursusPage]
})
export class TabKursusPageModule {}
