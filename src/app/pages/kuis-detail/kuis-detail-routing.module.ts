import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KuisDetailPage } from './kuis-detail.page';

const routes: Routes = [
  {
    path: '',
    component: KuisDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KuisDetailPageRoutingModule {}
