import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KursusSayaPage } from './kursus-saya.page';

const routes: Routes = [
  {
    path: '',
    component: KursusSayaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KursusSayaPageRoutingModule {}
