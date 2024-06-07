import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModulPageRoutingModule } from './shared-modul-routing.module';

import { SharedModulPage } from './shared-modul.page';
import { StarRatingComponent } from '../star-rating/star-rating.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModulPageRoutingModule
  ],
  declarations: [SharedModulPage, StarRatingComponent],
  exports: [StarRatingComponent]
})
export class SharedModulPageModule {}
