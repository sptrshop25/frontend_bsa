import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherRegisterPage } from './teacher-register.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRegisterPageRoutingModule {}
