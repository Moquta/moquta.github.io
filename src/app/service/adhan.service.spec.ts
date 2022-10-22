import { TestBed } from '@angular/core/testing';

import { AdhanService } from './adhan.service';

describe('AdhanService', () => {
  let service: AdhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdhanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
