import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCodeUpdateComponent } from './sales-code-update.component';

describe('SalesCodeUpdateComponent', () => {
  let component: SalesCodeUpdateComponent;
  let fixture: ComponentFixture<SalesCodeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesCodeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCodeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
