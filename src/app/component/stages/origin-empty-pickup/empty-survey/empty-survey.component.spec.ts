import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptySurveyComponent } from './empty-survey.component';

describe('EmptySurveyComponent', () => {
  let component: EmptySurveyComponent;
  let fixture: ComponentFixture<EmptySurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptySurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
