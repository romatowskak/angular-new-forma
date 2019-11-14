import { TestBed } from '@angular/core/testing';

import { DateCountService } from './date-count.service';

describe('DateCountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateCountService = TestBed.get(DateCountService);
    expect(service).toBeTruthy();
  });
});
