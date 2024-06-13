import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationForgotPasswordPage } from './verification-forgot-password.page';

describe('VerificationForgotPasswordPage', () => {
  let component: VerificationForgotPasswordPage;
  let fixture: ComponentFixture<VerificationForgotPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
