import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeforeQuizPage } from './before-quiz.page';

describe('BeforeQuizPage', () => {
  let component: BeforeQuizPage;
  let fixture: ComponentFixture<BeforeQuizPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
