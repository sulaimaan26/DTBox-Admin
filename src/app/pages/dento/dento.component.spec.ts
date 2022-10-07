import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentoComponent } from './dento.component';

describe('DentoComponent', () => {
  let component: DentoComponent;
  let fixture: ComponentFixture<DentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
