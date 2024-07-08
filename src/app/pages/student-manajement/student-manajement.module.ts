import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentManajementPageRoutingModule } from './student-manajement-routing.module';

import { StudentManajementPage } from './student-manajement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentManajementPageRoutingModule
  ],
  declarations: [StudentManajementPage]
})
export class StudentManajementPageModule {}
