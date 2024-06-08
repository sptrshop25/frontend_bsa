import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManajemenKursusPageRoutingModule } from './manajemen-kursus-routing.module';

import { ManajemenKursusPage } from './manajemen-kursus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManajemenKursusPageRoutingModule
  ],
  declarations: [ManajemenKursusPage]
})
export class ManajemenKursusPageModule {}
