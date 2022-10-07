import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashipmentComponent } from './trashipment.component';

describe('TrashipmentComponent', () => {
  let component: TrashipmentComponent;
  let fixture: ComponentFixture<TrashipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
