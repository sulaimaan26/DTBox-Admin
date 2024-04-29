import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralEventComponent } from './referral-event.component';

describe('ReferralEventComponent', () => {
  let component: ReferralEventComponent;
  let fixture: ComponentFixture<ReferralEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
