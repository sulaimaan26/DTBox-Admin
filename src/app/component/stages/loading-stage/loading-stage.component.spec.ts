import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingStageComponent } from './loading-stage.component';

describe('LoadingStageComponent', () => {
  let component: LoadingStageComponent;
  let fixture: ComponentFixture<LoadingStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
