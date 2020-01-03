import { ActionItem } from 'src/app/services/tasksService/tasks.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DaysLeftToDeadlineService } from 'src/app/services/daysLeftToDeadlineService/days-left-to-deadline.service';

@Pipe({
  name: 'daysLeftCounted'
})
export class DaysLeftCountedPipe implements PipeTransform {
  constructor(private daysCountService: DaysLeftToDeadlineService) {}
  transform(value: ActionItem, currentDate: Date = new Date()): number | undefined {
    if (value) {
      const dueDayCounted = value.dueDate
        ? this.daysCountService.daysLeftToDeadline(value.dueDate, currentDate)
        : undefined;
      return dueDayCounted;
    }
  }
}
