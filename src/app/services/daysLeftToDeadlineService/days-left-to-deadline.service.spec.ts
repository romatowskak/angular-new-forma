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

  it('should calculate correctly difference between dates if there are different months', () => {
    const diff = daysLeftToDeadlineService.daysLeftToDeadline(new Date('2019/10/05'), new Date('2019/08/05'));
    expect(diff).toBeGreaterThan(31);
  });

  it('should calculate correctly difference between dates if there are different years', () => {
    const diff = daysLeftToDeadlineService.daysLeftToDeadline(new Date('2020/10/05'), new Date('2019/08/10'));
    expect(diff).toBeGreaterThan(365);
  });

  it('should return negative value if currentDate is greater than dueDay ', () => {
    const diff = daysLeftToDeadlineService.daysLeftToDeadline(new Date('2019/08/05'), new Date('2019/10/05'));
    expect(diff).toBeLessThan(0);
  });
});
