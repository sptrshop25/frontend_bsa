import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailKursusPage } from './detail-kursus.page';

const routes: Routes = [
  {
    path: '',
    component: DetailKursusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailKursusPageRoutingModule {}
