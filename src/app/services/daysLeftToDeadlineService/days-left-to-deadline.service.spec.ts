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

  it('should return a type:number for type:Date input', () => {
    const func = daysLeftToDeadlineService.daysLeftToDeadline;
    expect(typeof func(new Date('2019/11/17'))).toBe('number');
  });
});
