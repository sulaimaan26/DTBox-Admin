import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInputTableComponent } from './list-input-table.component';

describe('ListInputTableComponent', () => {
  let component: ListInputTableComponent;
  let fixture: ComponentFixture<ListInputTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInputTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInputTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
