import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailKursusSayaPageRoutingModule } from './detail-kursus-saya-routing.module';

import { DetailKursusSayaPage } from './detail-kursus-saya.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailKursusSayaPageRoutingModule
  ],
  declarations: [DetailKursusSayaPage]
})
export class DetailKursusSayaPageModule {}
