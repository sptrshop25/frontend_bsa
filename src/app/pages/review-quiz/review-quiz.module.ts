import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewQuizPageRoutingModule } from './review-quiz-routing.module';

import { ReviewQuizPage } from './review-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewQuizPageRoutingModule
  ],
  declarations: [ReviewQuizPage]
})
export class ReviewQuizPageModule {}
