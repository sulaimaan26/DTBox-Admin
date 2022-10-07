import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdropdownComponent } from './searchdropdown.component';

describe('SearchdropdownComponent', () => {
  let component: SearchdropdownComponent;
  let fixture: ComponentFixture<SearchdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchdropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
