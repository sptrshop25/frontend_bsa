import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherRegister2Page } from './teacher-register2.page';

describe('TeacherRegister2Page', () => {
  let component: TeacherRegister2Page;
  let fixture: ComponentFixture<TeacherRegister2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRegister2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
