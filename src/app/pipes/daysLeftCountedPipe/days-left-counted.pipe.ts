import { ActionItem } from 'src/app/services/tasksService/tasks.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DaysLeftToDeadlineService } from 'src/app/services/daysLeftToDeadlineService/days-left-to-deadline.service';

@Pipe({
  name: 'daysLeftCounted'
})
export class DaysLeftCountedPipe implements PipeTransform {
  private currentDate: Date = new Date();
  constructor(private daysCountService: DaysLeftToDeadlineService) {}
  transform(value: ActionItem): number | undefined {
    if (value) {
      const dueDayCounted = value.dueDate
        ? this.daysCountService.daysLeftToDeadline(value.dueDate, this.currentDate)
        : undefined;
      return dueDayCounted;
    }
  }
}
