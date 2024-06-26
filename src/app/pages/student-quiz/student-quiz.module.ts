import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentQuizPageRoutingModule } from './student-quiz-routing.module';

import { StudentQuizPage } from './student-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentQuizPageRoutingModule
  ],
  declarations: [StudentQuizPage]
})
export class StudentQuizPageModule {}
