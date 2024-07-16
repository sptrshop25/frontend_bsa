import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeforeQuizPage } from './before-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: BeforeQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeforeQuizPageRoutingModule {}
