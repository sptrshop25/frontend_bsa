import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialPage } from './financial.page';

describe('FinancialPage', () => {
  let component: FinancialPage;
  let fixture: ComponentFixture<FinancialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
