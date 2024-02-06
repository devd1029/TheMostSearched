import { TestBed } from '@angular/core/testing';

import { GetTrendingItemsService } from './get-trending-items.service';

describe('GetTrendingItemsService', () => {
  let service: GetTrendingItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTrendingItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
