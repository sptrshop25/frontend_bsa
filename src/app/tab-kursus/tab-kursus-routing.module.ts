import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabKursusPage } from './tab-kursus.page';

const routes: Routes = [
  {
    path: '',
    component: TabKursusPage
  },
  {
    path: 'search-course',
    loadChildren: () => import('../pages/search-course/search-course.module').then( m => m.SearchCoursePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabKursusPageRoutingModule {}
