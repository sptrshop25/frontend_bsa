import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KuisDetailPageRoutingModule } from './kuis-detail-routing.module';

import { KuisDetailPage } from './kuis-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KuisDetailPageRoutingModule
  ],
  declarations: [KuisDetailPage]
})
export class KuisDetailPageModule {}
