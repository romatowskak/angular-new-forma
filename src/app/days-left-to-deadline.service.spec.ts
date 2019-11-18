import { TestBed } from '@angular/core/testing';
import { DaysLeftToDeadlineService } from './days-left-to-deadline.service';

describe('DaysLeftToDeadlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaysLeftToDeadlineService = TestBed.get(DaysLeftToDeadlineService);
    expect(service).toBeTruthy();
  });

  it('should return a type:number for type:Date input', () => {
    const service: DaysLeftToDeadlineService = TestBed.get(DaysLeftToDeadlineService);
    const func = service.daysLeftToDeadline;
    expect(typeof func(new Date('2019/11/17'))).toBe('number');
  });
});
