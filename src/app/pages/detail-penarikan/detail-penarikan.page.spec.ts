import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPenarikanPage } from './detail-penarikan.page';

describe('DetailPenarikanPage', () => {
  let component: DetailPenarikanPage;
  let fixture: ComponentFixture<DetailPenarikanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPenarikanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
