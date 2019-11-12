import { TasksService } from "./../tasks.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "action-items",
  templateUrl: "./action-items.component.html",
  styleUrls: ["./action-items.component.css"]
})
export class ActionItemsComponent implements OnInit {
  dataSource;
  loading = true;
  displayedColumns: string[] = ["title", "type", "completed", "dueDate", "daysLeft"];
  constructor(private tasksService: TasksService) {}
  ngOnInit() {
    this.tasksService.getAllTasks().subscribe(tasks => {
      this.dataSource = tasks;
      this.loading = false;
      this.tasksService.getCurrentDate();
      // for (const item of this.dataSource) {
      //   // circle color change using CSS classes
      //   if (item.dueDay <= 0) {
      //     item.colorClass = "afterDeadline";
      //   } else if (item.dueDay >= 1 && item.dueDay <= 2) {
      //     item.colorClass = "closeToDeadline";
      //   } else {
      //     item.colorClass = "moreThanTwoDaysLeft";
      //   }
      // }
    });
  }
}
