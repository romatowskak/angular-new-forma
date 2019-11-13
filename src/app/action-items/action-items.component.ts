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
          Object.keys(items).map((key, index) => {
            const currentDate = new Date();
            const dueDate = items[key].dueDate;
            const diffInMoths = dueDate.getTime() - currentDate.getTime();
            const diffInDays = Math.round(diffInMoths / (1000 * 3600 * 24));
            items[key].dueDay = diffInDays;
          });
          return items;
        })
      )
      .subscribe(tasks => {
        this.dataSource = tasks;
        this.loading = false;
      });
  }
}
