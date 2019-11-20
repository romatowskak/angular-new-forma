import { TestBed } from '@angular/core/testing';
import { DaysLeftToDeadlineService } from './days-left-to-deadline.service';

describe('DaysLeftToDeadlineService', () => {
  let daysLeftToDeadlineService;
  beforeEach(() => {
    daysLeftToDeadlineService = TestBed.get(DaysLeftToDeadlineService);
  });

  it('should be created', () => {
    expect(daysLeftToDeadlineService).toBeTruthy();
  });
});
