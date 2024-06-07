import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherRegister2PageRoutingModule } from './teacher-register2-routing.module';

import { TeacherRegister2Page } from './teacher-register2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherRegister2PageRoutingModule
  ],
  declarations: [TeacherRegister2Page]
})
export class TeacherRegister2PageModule {}
