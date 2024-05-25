import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabKursusPage } from './tab-kursus.page';

describe('TabKursusPage', () => {
  let component: TabKursusPage;
  let fixture: ComponentFixture<TabKursusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabKursusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
