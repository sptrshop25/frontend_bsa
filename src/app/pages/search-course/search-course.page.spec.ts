import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCoursePage } from './search-course.page';

describe('SearchCoursePage', () => {
  let component: SearchCoursePage;
  let fixture: ComponentFixture<SearchCoursePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
