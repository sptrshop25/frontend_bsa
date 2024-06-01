import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherRegisterPageRoutingModule } from './teacher-register-routing.module';

import { TeacherRegisterPage } from './teacher-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherRegisterPageRoutingModule
  ],
  declarations: [TeacherRegisterPage]
})
export class TeacherRegisterPageModule {}
