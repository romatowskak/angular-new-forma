import { Pipe, PipeTransform } from "@angular/core";
import { TasksService, ActionTasksElement } from "./tasks.service";

@Pipe({
  name: "circleColor"
})
export class CircleColorPipe implements PipeTransform {
  dataSource: Array<ActionTasksElement> = [];
  colorClass: string;
  constructor(private tasksService: TasksService) {
    this.tasksService.getAllTasks().subscribe(tasks => {
      this.dataSource = tasks;
    });
  }

  transform(value: string): any {
    for (const item of this.dataSource) {
      if (item.dueDay <= 0) {
        value = "afterDeadline";
      } else if (item.dueDay >= 1 && item.dueDay <= 2) {
        value = "closeToDeadline";
      } else {
        value = "moreThanTwoDaysLeft";
      }
      return value;
    }
  }
}
