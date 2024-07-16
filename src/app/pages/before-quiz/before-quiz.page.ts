import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-before-quiz',
  templateUrl: './before-quiz.page.html',
  styleUrls: ['./before-quiz.page.scss'],
})
export class BeforeQuizPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goDoQuiz() {
    this.router.navigate(['/do-quiz', { quiz_id: 1 }]);
  }
}
