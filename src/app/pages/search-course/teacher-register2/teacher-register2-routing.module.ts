import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherRegister2Page } from './teacher-register2.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherRegister2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRegister2PageRoutingModule {}
