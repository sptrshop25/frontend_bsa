import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeforeQuizPageRoutingModule } from './before-quiz-routing.module';

import { BeforeQuizPage } from './before-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeforeQuizPageRoutingModule
  ],
  declarations: [BeforeQuizPage]
})
export class BeforeQuizPageModule {}
