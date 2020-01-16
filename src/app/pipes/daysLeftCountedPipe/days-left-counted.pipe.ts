import { ActionItem } from 'src/app/services/tasksService/tasks.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DaysLeftToDeadlineService } from 'src/app/services/daysLeftToDeadlineService/days-left-to-deadline.service';

@Pipe({
  name: 'daysLeftCounted'
})
export class DaysLeftCountedPipe implements PipeTransform {
  constructor(private daysCountService: DaysLeftToDeadlineService) {}
  transform(value: Date, currentDate: Date = new Date()): number | undefined {
    return value ? this.daysCountService.daysLeftToDeadline(value, currentDate) : undefined;
  }
}
