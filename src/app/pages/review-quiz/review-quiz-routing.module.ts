import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewQuizPage } from './review-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewQuizPageRoutingModule {}
