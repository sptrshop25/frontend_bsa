import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentManajementPage } from './student-manajement.page';

describe('StudentManajementPage', () => {
  let component: StudentManajementPage;
  let fixture: ComponentFixture<StudentManajementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentManajementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
