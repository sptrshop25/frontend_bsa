import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherRegister3PageRoutingModule } from './teacher-register3-routing.module';

import { TeacherRegister3Page } from './teacher-register3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherRegister3PageRoutingModule
  ],
  declarations: [TeacherRegister3Page]
})
export class TeacherRegister3PageModule {}
