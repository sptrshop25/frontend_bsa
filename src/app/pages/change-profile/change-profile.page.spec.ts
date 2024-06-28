import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeProfilePage } from './change-profile.page';

describe('ChangeProfilePage', () => {
  let component: ChangeProfilePage;
  let fixture: ComponentFixture<ChangeProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
