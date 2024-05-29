import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabHistoryPage } from './tab-history.page';

describe('TabHistoryPage', () => {
  let component: TabHistoryPage;
  let fixture: ComponentFixture<TabHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
