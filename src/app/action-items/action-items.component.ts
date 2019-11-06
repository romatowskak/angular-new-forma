import { TasksService, ActionTasksElement } from './../tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.css']
})
export class ActionItemsComponent implements OnInit {
  loading = true;
  displayedColumns: string[] = ['title', 'type', 'completed', 'dueDate', 'daysLeft'];
  dataSource;
  constructor(private tasksService: TasksService) {
    this.tasksService.getAllTasks().subscribe(tasks => {
      this.dataSource = tasks;
      this.loading = false;
    });
  }
  ngOnInit() {}
}
