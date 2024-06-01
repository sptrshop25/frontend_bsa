import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KursusSayaPageRoutingModule } from './kursus-saya-routing.module';

import { KursusSayaPage } from './kursus-saya.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KursusSayaPageRoutingModule
  ],
  declarations: [KursusSayaPage]
})
export class KursusSayaPageModule {}
