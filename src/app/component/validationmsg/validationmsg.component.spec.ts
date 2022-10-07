import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationmsgComponent } from './validationmsg.component';

describe('ValidationmsgComponent', () => {
  let component: ValidationmsgComponent;
  let fixture: ComponentFixture<ValidationmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationmsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
