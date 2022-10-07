import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginEmptyPickupComponent } from './origin-empty-pickup.component';

describe('OriginEmptyPickupComponent', () => {
  let component: OriginEmptyPickupComponent;
  let fixture: ComponentFixture<OriginEmptyPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginEmptyPickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginEmptyPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
