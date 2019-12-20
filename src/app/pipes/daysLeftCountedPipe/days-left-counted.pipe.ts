import { Pipe, PipeTransform } from '@angular/core';
import { DaysLeftToDeadlineService } from 'src/app/services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { ActionItem } from 'src/app/services/tasksService/tasks.service';

@Pipe({
  name: 'daysLeftCounted'
})
export class DaysLeftCountedPipe implements PipeTransform {
  constructor(private daysCountService: DaysLeftToDeadlineService) {}
  transform(value: any, dueDate: Date, currentDate: Date): ActionItem {
    const dueDayCounted = value.dueDate
      ? this.daysCountService.daysLeftToDeadline(value.dueDate, currentDate)
      : undefined;
    return { ...value, dueDay: dueDayCounted };
  }
}
