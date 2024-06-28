import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTeacherPage } from './edit-teacher.page';

describe('EditTeacherPage', () => {
  let component: EditTeacherPage;
  let fixture: ComponentFixture<EditTeacherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeacherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
