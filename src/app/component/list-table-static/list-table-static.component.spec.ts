import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTableStaticComponent } from './list-table-static.component';

describe('ListTableComponent', () => {
  let component: ListTableStaticComponent;
  let fixture: ComponentFixture<ListTableStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTableStaticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTableStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
