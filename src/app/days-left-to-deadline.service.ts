import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DaysLeftToDeadlineService {
  daysLeftToDeadline(dueDate) {
    const currentDate = new Date();
    const diffInMonths = dueDate.getTime() - currentDate.getTime();
    const diffInDays = Math.round(diffInMonths / (1000 * 3600 * 24));
    return diffInDays;
  }
}
