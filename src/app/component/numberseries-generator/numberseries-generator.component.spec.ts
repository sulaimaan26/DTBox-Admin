import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberseriesGeneratorComponent } from './numberseries-generator.component';

describe('NumberseriesGeneratorComponent', () => {
  let component: NumberseriesGeneratorComponent;
  let fixture: ComponentFixture<NumberseriesGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberseriesGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberseriesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
