import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesCodeDialogComponent } from './add-sales-code-dialog.component';

describe('AddSalesCodeDialogComponent', () => {
  let component: AddSalesCodeDialogComponent;
  let fixture: ComponentFixture<AddSalesCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesCodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
