import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManajemenKursusPage } from './manajemen-kursus.page';

const routes: Routes = [
  {
    path: '',
    component: ManajemenKursusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManajemenKursusPageRoutingModule {}
