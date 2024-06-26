import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewQuizPage } from './review-quiz.page';

describe('ReviewQuizPage', () => {
  let component: ReviewQuizPage;
  let fixture: ComponentFixture<ReviewQuizPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
