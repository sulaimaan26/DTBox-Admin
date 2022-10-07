import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullContainerLoadComponent } from './full-container-load.component';

describe('FullContainerLoadComponent', () => {
  let component: FullContainerLoadComponent;
  let fixture: ComponentFixture<FullContainerLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullContainerLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullContainerLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
