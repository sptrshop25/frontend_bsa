import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormKursusPage } from './form-kursus.page';

describe('FormKursusPage', () => {
  let component: FormKursusPage;
  let fixture: ComponentFixture<FormKursusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKursusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
