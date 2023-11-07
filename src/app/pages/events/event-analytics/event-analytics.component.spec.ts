import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAnalyticsComponent } from './event-analytics.component';

describe('EventAnalyticsComponent', () => {
  let component: EventAnalyticsComponent;
  let fixture: ComponentFixture<EventAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
