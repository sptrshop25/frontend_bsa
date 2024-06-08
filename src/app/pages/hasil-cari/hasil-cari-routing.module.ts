import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HasilCariPage } from './hasil-cari.page';

const routes: Routes = [
  {
    path: '',
    component: HasilCariPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HasilCariPageRoutingModule {}
