import { Pipe, PipeTransform } from '@angular/core';
import { DaysLeftToDeadlineService } from 'src/app/services/daysLeftToDeadlineService/days-left-to-deadline.service';

@Pipe({
  name: 'daysLeftCounted'
})
export class DaysLeftCountedPipe implements PipeTransform {
  constructor(private daysCountService: DaysLeftToDeadlineService) {}
  transform(value?: Date | string, currentDate: Date = new Date()): number | undefined {
    let dueDate;
    if (typeof value === 'string') {
      value === '' ? (dueDate = undefined) : (dueDate = new Date(value));
    }
    return value ? this.daysCountService.daysLeftToDeadline(dueDate, currentDate) : undefined;
  }
}
