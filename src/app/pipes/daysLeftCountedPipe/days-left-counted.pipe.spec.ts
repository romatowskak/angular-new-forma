import { DaysLeftCountedPipe } from './days-left-counted.pipe';
import { DaysLeftToDeadlineService } from 'src/app/services/daysLeftToDeadlineService/days-left-to-deadline.service';

describe('DaysLeftCountedPipe', () => {
  it('create an instance', () => {
    const pipe = new DaysLeftCountedPipe(new DaysLeftToDeadlineService());
    expect(pipe).toBeTruthy();
  });

  it('should create an instance', () => {
    const pipe = new DaysLeftCountedPipe(new DaysLeftToDeadlineService());
    const item = {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2020/01/03'),
      id: '1'
    };
    expect(pipe.transform(item.dueDate, new Date('2020/01/03'))).toBe(0);
  });
});
