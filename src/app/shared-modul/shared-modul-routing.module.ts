import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModulPage } from './shared-modul.page';

const routes: Routes = [
  {
    path: '',
    component: SharedModulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedModulPageRoutingModule {}
