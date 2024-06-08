import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManajemenKursusPage } from './manajemen-kursus.page';

describe('ManajemenKursusPage', () => {
  let component: ManajemenKursusPage;
  let fixture: ComponentFixture<ManajemenKursusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManajemenKursusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
