import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchCoursePageRoutingModule } from './search-course-routing.module';

import { SearchCoursePage } from './search-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchCoursePageRoutingModule
  ],
  declarations: [SearchCoursePage]
})
export class SearchCoursePageModule {}
