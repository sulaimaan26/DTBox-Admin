import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightRelatedComponent } from './freight-related.component';

describe('FreightRelatedComponent', () => {
  let component: FreightRelatedComponent;
  let fixture: ComponentFixture<FreightRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreightRelatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
