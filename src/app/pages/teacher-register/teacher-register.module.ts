import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TeacherRegisterPageRoutingModule } from './teacher-register-routing.module';

import { TeacherRegisterPage } from './teacher-register.page';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TeacherRegisterPageRoutingModule,
  ],
  declarations: [TeacherRegisterPage, CustomAlertComponent],
})
export class TeacherRegisterPageModule {}
