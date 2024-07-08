import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentManajementPage } from './student-manajement.page';

const routes: Routes = [
  {
    path: '',
    component: StudentManajementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentManajementPageRoutingModule {}
