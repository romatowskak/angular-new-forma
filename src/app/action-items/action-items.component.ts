import { AddItemComponent } from './../add-item/add-item.component';
import { ActionTasksElement } from './../services/tasksService/tasks.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { TasksService } from '../services/tasksService/tasks.service';
import { DaysLeftToDeadlineService } from '../services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

export interface ActionTasksElementMapped extends ActionTasksElement {
  dueDay: number;
}
@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.css']
})
export class ActionItemsComponent implements OnInit, OnDestroy {
  dataSource: ActionTasksElementMapped[];
  loading = true;
  currentDate = new Date();
  subscription: Subscription;
  constructor(
    private tasksService: TasksService,
    private daysCountService: DaysLeftToDeadlineService,
    private matDialog: MatDialog
  ) {}
  ngOnInit() {
    this.retrieveTasks();
    this.subscription = this.tasksService.updatedItemsList.subscribe(() => {
      this.retrieveTasks();
    });
  }
  retrieveTasks() {
    this.tasksService
      .getAllTasks()
      .pipe(
        map(items => {
          const mappedActionItems = items.map(item => {
            const dueDayCounted = this.daysCountService.daysLeftToDeadline(item.dueDate, this.currentDate);
            return { ...item, dueDay: dueDayCounted };
          });
          return mappedActionItems;
        })
      )
      .subscribe(tasks => {
        this.dataSource = tasks;
        this.loading = false;
      });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { width: '450px', height: '380px' };
    this.matDialog.open(AddItemComponent, dialogConfig.data);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
