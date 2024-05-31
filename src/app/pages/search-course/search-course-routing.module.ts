import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchCoursePage } from './search-course.page';

const routes: Routes = [
  {
    path: '',
    component: SearchCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchCoursePageRoutingModule {}
