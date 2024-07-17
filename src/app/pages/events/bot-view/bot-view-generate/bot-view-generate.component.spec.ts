import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotViewGenerateComponent } from './bot-view-generate.component';

describe('BotViewGenerateComponent', () => {
  let component: BotViewGenerateComponent;
  let fixture: ComponentFixture<BotViewGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotViewGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotViewGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
