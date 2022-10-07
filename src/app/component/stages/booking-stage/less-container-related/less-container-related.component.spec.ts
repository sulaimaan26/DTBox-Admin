import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessContainerRelatedComponent } from './less-container-related.component';

describe('LessContainerRelatedComponent', () => {
  let component: LessContainerRelatedComponent;
  let fixture: ComponentFixture<LessContainerRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessContainerRelatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessContainerRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
