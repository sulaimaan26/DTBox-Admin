import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodeGenerateComponent } from './coupon-code-generate.component';

describe('CouponCodeGenerateComponent', () => {
  let component: CouponCodeGenerateComponent;
  let fixture: ComponentFixture<CouponCodeGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponCodeGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodeGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
