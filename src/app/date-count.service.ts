import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DateCountService {
  constructor() {}

  countDate(dueDate) {
    const currentDate = new Date();
    const diffInMoths = dueDate.getTime() - currentDate.getTime();
    const diffInDays = Math.round(diffInMoths / (1000 * 3600 * 24));
    return diffInDays;
  }
}
