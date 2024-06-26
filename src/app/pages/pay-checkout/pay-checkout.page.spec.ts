import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayCheckoutPage } from './pay-checkout.page';

describe('PayCheckoutPage', () => {
  let component: PayCheckoutPage;
  let fixture: ComponentFixture<PayCheckoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PayCheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
