import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDisplayComponent } from './common-display.component';

describe('CommonDisplayComponent', () => {
  let component: CommonDisplayComponent;
  let fixture: ComponentFixture<CommonDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
