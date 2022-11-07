import { TestBed } from '@angular/core/testing';

import { DealingWithDataService } from './dealing-with-data.service';

describe('DealingWithDataService', () => {
  let service: DealingWithDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealingWithDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
