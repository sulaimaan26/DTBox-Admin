import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginCargoPickupComponent } from './origin-cargo-pickup.component';

describe('OriginCargoPickupComponent', () => {
  let component: OriginCargoPickupComponent;
  let fixture: ComponentFixture<OriginCargoPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginCargoPickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginCargoPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
