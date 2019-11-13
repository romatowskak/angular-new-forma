import { TasksService } from "./../tasks.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { map } from "rxjs/operators";

@Component({
  selector: "app-action-items",
  templateUrl: "./action-items.component.html",
  styleUrls: ["./action-items.component.css"]
})
export class ActionItemsComponent implements OnInit {
  dataSource;
  loading = true;
  displayedColumns: string[] = ["title", "type", "completed", "dueDate", "daysLeft"];
  constructor(private tasksService: TasksService) {}
  ngOnInit() {
    this.tasksService
      .getAllTasks()
      .pipe(
        map(items => {
          for (const obj of items) {
            const currentDate = new Date();
            const dueDate = obj.dueDate;
            const diffInMoths = dueDate.getTime() - currentDate.getTime();
            const diffInDays = Math.round(diffInMoths / (1000 * 3600 * 24));
            Object.defineProperty(obj, "dueDay", { value: diffInDays });
            console.log(items);
            console.log(obj.dueDay);
          }
        })
      )
      .subscribe(tasks => {
        this.dataSource = tasks;
        this.loading = false;
        // this.tasksService.getCurrentDate();
      });
  }
}
