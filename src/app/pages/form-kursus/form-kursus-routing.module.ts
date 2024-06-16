import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormKursusPage } from './form-kursus.page';

const routes: Routes = [
  {
    path: '',
    component: FormKursusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormKursusPageRoutingModule {}
