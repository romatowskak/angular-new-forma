import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DaysLeftToDeadlineService {
  daysLeftToDeadline(dueDate: Date, currentDate: Date) {
    if (typeof dueDate === 'string') {
      return;
    } else {
      const diffBetweenDates = dueDate.getTime() - currentDate.getTime();
      const daysDifference = Math.round(diffBetweenDates / (1000 * 3600 * 24));
      return daysDifference;
    }
  }
}
