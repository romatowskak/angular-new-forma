import { AddItemComponent } from './../add-item/add-item.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { TasksService, ActionItem } from '../services/tasksService/tasks.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  isLoadingActionItems = false;
  isLoadingActionItem = false;
  actionItemId: string | undefined;
  actionItem: ActionItem;
  errorMessage: string | undefined;
  justAddedItem: ActionItem;
  private querySubscription: Subscription;

  constructor(
    private tasksService: TasksService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.retrieveActionItems();
    this.getQueryParams();
  }

  retrieveActionItems(): void {
    this.isLoadingActionItems = true;
    this.isLoadingActionItem = true;
    this.tasksService
      .getAllItems()
      .pipe(first())
      .subscribe(tasks => {
        this.dataSource = tasks;
        this.isLoadingActionItems = false;
        this.isLoadingActionItem = false;
        this.justAddedItem = tasks[tasks.length - 1];
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
          const justAddedItemId = parseInt(this.justAddedItem.id) + 1;
          this.router.navigate(['/items'], { queryParams: { id: justAddedItemId } });
        }
      });
  }
  private getActionItem(itemId: string | undefined): void {
    this.isLoadingActionItem = true;
    this.tasksService
      .getActionItem(itemId)
      .pipe(first())
      .subscribe(
        item => {
          this.isLoadingActionItem = false;
          this.actionItem = item;
        },
        err => {
          if (err.status === 404) this.errorMessage = err.statusText;
        }
      );
  }
  getQueryParams(): void {
    this.isLoadingActionItem = true;
    this.querySubscription = this.route.queryParams.subscribe(params => {
      this.actionItemId = params.id;
      if (this.actionItemId) {
        this.getActionItem(this.actionItemId);
      }
    });
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
