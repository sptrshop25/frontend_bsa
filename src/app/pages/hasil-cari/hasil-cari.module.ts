import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HasilCariPageRoutingModule } from './hasil-cari-routing.module';

import { HasilCariPage } from './hasil-cari.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HasilCariPageRoutingModule
  ],
  declarations: [HasilCariPage]
})
export class HasilCariPageModule {}
