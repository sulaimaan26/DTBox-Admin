import { TestBed } from '@angular/core/testing';

import { ButtonControlService } from './button-control.service';

describe('ButtonControlService', () => {
  let service: ButtonControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
