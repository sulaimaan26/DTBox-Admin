import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralEventDashboardComponent } from './referral-event-dashboard.component';

describe('ReferralEventDashboardComponent', () => {
  let component: ReferralEventDashboardComponent;
  let fixture: ComponentFixture<ReferralEventDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralEventDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralEventDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
