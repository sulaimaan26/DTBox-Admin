import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotViewReportComponent } from './bot-view-report.component';

describe('BotViewReportComponent', () => {
  let component: BotViewReportComponent;
  let fixture: ComponentFixture<BotViewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotViewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
