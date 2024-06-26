import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDisplayDashboardComponent } from './common-display-dashboard.component';

describe('CommonDisplayDashboardComponent', () => {
  let component: CommonDisplayDashboardComponent;
  let fixture: ComponentFixture<CommonDisplayDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDisplayDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDisplayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
