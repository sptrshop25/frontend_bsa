import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherRegister3Page } from './teacher-register3.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherRegister3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRegister3PageRoutingModule {}
