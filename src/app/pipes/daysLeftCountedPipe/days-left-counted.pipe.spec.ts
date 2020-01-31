import { DaysLeftCountedPipe } from './days-left-counted.pipe';
import { DaysLeftToDeadlineService } from 'src/app/services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { TestBed } from '@angular/core/testing';

describe('DaysLeftCountedPipe', () => {
  let daysLeftService: DaysLeftToDeadlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
    });
    daysLeftService = TestBed.get(DaysLeftToDeadlineService);
  });

  it('create an instance', () => {
    const pipe = new DaysLeftCountedPipe(new DaysLeftToDeadlineService());
    expect(pipe).toBeTruthy();
  });
});
