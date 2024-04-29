import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralEventFormComponent } from './referral-event-form.component';

describe('ReferralEventFormComponent', () => {
  let component: ReferralEventFormComponent;
  let fixture: ComponentFixture<ReferralEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralEventFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
