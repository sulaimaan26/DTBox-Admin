import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCodeDashboardComponent } from './sales-code-dashboard.component';

describe('SalesCodeDashboardComponent', () => {
  let component: SalesCodeDashboardComponent;
  let fixture: ComponentFixture<SalesCodeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesCodeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCodeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
