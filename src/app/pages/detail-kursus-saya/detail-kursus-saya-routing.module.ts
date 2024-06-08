import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailKursusSayaPage } from './detail-kursus-saya.page';

const routes: Routes = [
  {
    path: '',
    component: DetailKursusSayaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailKursusSayaPageRoutingModule {}
