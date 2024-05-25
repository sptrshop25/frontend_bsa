import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabHistoryPage } from './tab-history.page';

const routes: Routes = [
  {
    path: '',
    component: TabHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabHistoryPageRoutingModule {}
