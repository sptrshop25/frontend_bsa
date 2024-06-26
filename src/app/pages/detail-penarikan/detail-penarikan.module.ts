import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPenarikanPageRoutingModule } from './detail-penarikan-routing.module';

import { DetailPenarikanPage } from './detail-penarikan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPenarikanPageRoutingModule
  ],
  declarations: [DetailPenarikanPage]
})
export class DetailPenarikanPageModule {}
