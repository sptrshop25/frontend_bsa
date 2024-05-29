import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabKursusPage } from './tab-kursus.page';

const routes: Routes = [
  {
    path: '',
    component: TabKursusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabKursusPageRoutingModule {}
