import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HasilCariPage } from './hasil-cari.page';

describe('HasilCariPage', () => {
  let component: HasilCariPage;
  let fixture: ComponentFixture<HasilCariPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HasilCariPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
