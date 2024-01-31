import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDashboardComponent } from './banner-dashboard.component';

describe('BannerDashboardComponent', () => {
  let component: BannerDashboardComponent;
  let fixture: ComponentFixture<BannerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
