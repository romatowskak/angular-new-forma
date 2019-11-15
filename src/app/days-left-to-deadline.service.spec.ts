import { TestBed } from '@angular/core/testing';

import { DaysLeftToDeadlineService } from './days-left-to-deadline.service';

describe('DaysLeftToDeadlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaysLeftToDeadlineService = TestBed.get(DaysLeftToDeadlineService);
    expect(service).toBeTruthy();
  });
});
