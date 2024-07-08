import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCoursePageRoutingModule } from './edit-course-routing.module';

import { EditCoursePage } from './edit-course.page';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCoursePageRoutingModule
  ],
  declarations: [EditCoursePage, CustomAlertComponent],
})
export class EditCoursePageModule {}
