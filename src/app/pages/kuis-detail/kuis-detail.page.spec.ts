import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuisDetailPage } from './kuis-detail.page';

describe('KuisDetailPage', () => {
  let component: KuisDetailPage;
  let fixture: ComponentFixture<KuisDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KuisDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
