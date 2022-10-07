import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStageComponent } from './booking-stage.component';

describe('BookingStageComponent', () => {
  let component: BookingStageComponent;
  let fixture: ComponentFixture<BookingStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
