import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KursusSayaPage } from './kursus-saya.page';

describe('KursusSayaPage', () => {
  let component: KursusSayaPage;
  let fixture: ComponentFixture<KursusSayaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KursusSayaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
