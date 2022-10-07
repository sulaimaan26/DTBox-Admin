import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPageWrapperComponent } from './step-page-wrapper.component';

describe('StepPageWrapperComponent', () => {
  let component: StepPageWrapperComponent;
  let fixture: ComponentFixture<StepPageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepPageWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
