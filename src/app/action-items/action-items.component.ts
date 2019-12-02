import { AddItemComponent } from './../add-item/add-item.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { TasksService, ActionItem } from '../services/tasksService/tasks.service';
import { DaysLeftToDeadlineService } from '../services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

export interface ActionItemMapped extends ActionItem {
  dueDay?: number;
}
@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.css']
})
export class ActionItemsComponent implements OnInit, OnDestroy {
  dataSource: ActionItemMapped[];
  loading = false;
  currentDate: Date = new Date();
  subscription: Subscription;
  constructor(
    private tasksService: TasksService,
    private daysCountService: DaysLeftToDeadlineService,
    private matDialog: MatDialog
  ) {}
  ngOnInit() {
    this.retrieveActionItems();
  }
  retrieveActionItems() {
    this.loading = true;
    this.tasksService
      .getAllItems()
      .pipe(
        map(items => {
          const mappedActionItems: ActionItemMapped[] = items.map(item => {
            const dueDayCounted = item.dueDate
              ? this.daysCountService.daysLeftToDeadline(item.dueDate, this.currentDate)
              : undefined;
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
    this.matDialog
      .open(AddItemComponent, dialogConfig.data)
      .afterClosed()
      .subscribe(item => {
        if (item !== undefined) {
          this.retrieveActionItems();
        }
        return;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
