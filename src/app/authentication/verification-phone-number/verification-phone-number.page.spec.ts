import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationPhoneNumberPage } from './verification-phone-number.page';

describe('VerificationPhoneNumberPage', () => {
  let component: VerificationPhoneNumberPage;
  let fixture: ComponentFixture<VerificationPhoneNumberPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationPhoneNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
