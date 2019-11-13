import { Pipe, PipeTransform } from "@angular/core";
import { TasksService, ActionTasksElement } from "./tasks.service";

@Pipe({
  name: "circleColor"
})
export class CircleColorPipe implements PipeTransform {
  transform(dueDay: number): string {
    if (dueDay <= 0) {
      return "afterDeadline";
    } else if (dueDay >= 1 && dueDay <= 2) {
      return "closeToDeadline";
    } else {
      return "moreThanTwoDaysLeft";
    }
  }
}
