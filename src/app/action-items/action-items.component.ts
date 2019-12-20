import { AddItemComponent } from './../add-item/add-item.component';
import { Component, OnInit } from '@angular/core';
import { map, first } from 'rxjs/operators';
import { TasksService, ActionItem } from '../services/tasksService/tasks.service';
import { DaysLeftToDeadlineService } from '../services/daysLeftToDeadlineService/days-left-to-deadline.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DaysLeftCountedPipe } from '../pipes/daysLeftCountedPipe/days-left-counted.pipe';

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
  isLoadingActionItems = false;
  isLoadingActionItem = false;
  currentDate: Date = new Date();
  actionItemId: string;
  actionItem: Observable<ActionItem>;

  constructor(
    private tasksService: TasksService,
    private daysCountService: DaysLeftToDeadlineService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private daysLeftPipe: DaysLeftCountedPipe
  ) {}
  ngOnInit() {
    this.retrieveActionItems();
    this.route.queryParams.subscribe(params => {
      this.actionItemId = params.id;
      this.getActionItem();
    });
  }
  retrieveActionItems(): void {
    this.isLoadingActionItems = true;
    this.tasksService
      .getAllItems()
      .pipe(
        first(),
        map(items => {
          const mappedActionItems: ActionItemMapped[] = items.map(item => {
            return this.daysLeftPipe.transform(item, item.dueDate, this.currentDate);
          });
          return mappedActionItems;
        })
      )
      .subscribe(tasks => {
        this.dataSource = tasks;
        this.isLoadingActionItems = false;
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
  private getActionItem(): void {
    this.actionItem = this.tasksService.getActionItem(this.actionItemId);
  }

  changePath() {
    this.router.navigateByUrl('/items');
  }
}
