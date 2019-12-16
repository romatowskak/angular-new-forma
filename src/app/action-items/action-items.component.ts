import { AddItemComponent } from './../add-item/add-item.component';
import { Component, OnInit } from '@angular/core';
import { map, first } from 'rxjs/operators';
import { TasksService, ActionItem } from '../services/tasksService/tasks.service';
import { DaysLeftToDeadlineService } from '../services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

export interface ActionItemMapped extends ActionItem {
  dueDay?: number;
}

@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.css']
})
export class ActionItemsComponent implements OnInit {
  dataSource: ActionItemMapped[];
  isloadingActionItems = false;
  private currentDate: Date = new Date();

  constructor(
    private tasksService: TasksService,
    private daysCountService: DaysLeftToDeadlineService,
    private matDialog: MatDialog
  ) {}
  ngOnInit() {
    this.retrieveActionItems();
  }
  retrieveActionItems(): void {
    this.isloadingActionItems = true;
    this.tasksService
      .getAllItems()
      .pipe(
        first(),
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
        this.isloadingActionItems = false;
      });
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { width: '470px', height: 'auto', disableClose: true };
    this.matDialog
      .open(AddItemComponent, dialogConfig.data)
      .afterClosed()
      .subscribe(item => {
        if (!!item) {
          this.retrieveActionItems();
        }
      });
  }
}
