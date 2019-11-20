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

  it('should calculate difference between dates', () => {
    const diff = daysLeftToDeadlineService.daysLeftToDeadline(new Date('2019/12/29'), new Date('2019/12/28'));
    expect(diff).toBe(1);
  });
});
