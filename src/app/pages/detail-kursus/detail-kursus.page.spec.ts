import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailKursusPage } from './detail-kursus.page';

describe('DetailKursusPage', () => {
  let component: DetailKursusPage;
  let fixture: ComponentFixture<DetailKursusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailKursusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
