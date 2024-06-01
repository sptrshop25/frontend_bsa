import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherRegisterPage } from './teacher-register.page';

describe('TeacherRegisterPage', () => {
  let component: TeacherRegisterPage;
  let fixture: ComponentFixture<TeacherRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
