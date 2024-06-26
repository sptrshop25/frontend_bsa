import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherProfilePageRoutingModule } from './teacher-profile-routing.module';

import { TeacherProfilePage } from './teacher-profile.page';
import { CurrencyFormatPipe } from './currency-format.pipe';
import { SharedModulPageModule } from '../../shared-modul/shared-modul.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherProfilePageRoutingModule,
    SharedModulPageModule
  ],
  declarations: [TeacherProfilePage, CurrencyFormatPipe]
})
export class TeacherProfilePageModule {}
