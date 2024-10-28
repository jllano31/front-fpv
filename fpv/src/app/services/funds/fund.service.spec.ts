import { TestBed } from '@angular/core/testing';

import { FundService } from './fund.service';

describe('FundsService', () => {
  let service: FundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
