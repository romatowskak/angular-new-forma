import { TasksService } from "./../tasks.service";
import { Component, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: "action-items",
  templateUrl: "./action-items.component.html",
  styleUrls: ["./action-items.component.css"]
})
export class ActionItemsComponent implements OnInit {
  displayedColumns: string[] = [
    "title",
    "type",
    "completed",
    "dueDate",
    "daysLeft"
  ];
  dataSource;
  constructor(private tasksService: TasksService) {
    this.dataSource = this.tasksService.getAllTasks();
  }
  ngOnInit() {}
}
