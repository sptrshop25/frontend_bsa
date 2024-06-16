import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormKursusPageRoutingModule } from './form-kursus-routing.module';

import { FormKursusPage } from './form-kursus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormKursusPageRoutingModule
  ],
  declarations: [FormKursusPage]
})
export class FormKursusPageModule {}
