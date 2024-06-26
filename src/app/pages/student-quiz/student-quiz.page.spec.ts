import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentQuizPage } from './student-quiz.page';

describe('StudentQuizPage', () => {
  let component: StudentQuizPage;
  let fixture: ComponentFixture<StudentQuizPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
