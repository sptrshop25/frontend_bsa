import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentQuizPage } from './student-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: StudentQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentQuizPageRoutingModule {}
