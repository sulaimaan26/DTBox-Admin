import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralLogComponent } from './referral-log.component';

describe('ReferralLogComponent', () => {
  let component: ReferralLogComponent;
  let fixture: ComponentFixture<ReferralLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
