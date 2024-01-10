import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodeDashboardComponent } from './coupon-code-dashboard.component';

describe('CouponCodeDashboardComponent', () => {
  let component: CouponCodeDashboardComponent;
  let fixture: ComponentFixture<CouponCodeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponCodeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
