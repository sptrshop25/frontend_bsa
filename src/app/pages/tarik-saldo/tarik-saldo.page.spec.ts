import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarikSaldoPage } from './tarik-saldo.page';

describe('TarikSaldoPage', () => {
  let component: TarikSaldoPage;
  let fixture: ComponentFixture<TarikSaldoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TarikSaldoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
