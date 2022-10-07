import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListInputTableComponent } from './form-list-input-table.component';

describe('FormListInputTableComponent', () => {
  let component: FormListInputTableComponent;
  let fixture: ComponentFixture<FormListInputTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormListInputTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListInputTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
