import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTeacherPageRoutingModule } from './edit-teacher-routing.module';

import { EditTeacherPage } from './edit-teacher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTeacherPageRoutingModule
  ],
  declarations: [EditTeacherPage]
})
export class EditTeacherPageModule {}
