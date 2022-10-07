import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCargoComponent } from './empty-cargo.component';

describe('EmptyPickupComponent', () => {
  let component: EmptyCargoComponent;
  let fixture: ComponentFixture<EmptyCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
