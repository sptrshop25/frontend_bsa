import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailKursusSayaPage } from './detail-kursus-saya.page';

describe('DetailKursusSayaPage', () => {
  let component: DetailKursusSayaPage;
  let fixture: ComponentFixture<DetailKursusSayaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailKursusSayaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
