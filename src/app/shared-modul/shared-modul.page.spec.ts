import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModulPage } from './shared-modul.page';

describe('SharedModulPage', () => {
  let component: SharedModulPage;
  let fixture: ComponentFixture<SharedModulPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedModulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
