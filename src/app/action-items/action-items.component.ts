import { AddItemComponent } from './../add-item/add-item.component';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./action-items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionItemsComponent implements OnInit, OnDestroy {
  dataSource: ActionItemMapped[];
  isLoadingActionItems = false;
  isLoadingActionItem = false;
  actionItemId: string | undefined;
  actionItem: ActionItem;
  private querySubscription: Subscription;

  constructor(
    private tasksService: TasksService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.retrieveActionItems();
    this.getQueryParams();
  }
  retrieveActionItems(): void {
    this.isLoadingActionItems = true;
    this.tasksService
      .getAllItems()
      .pipe(first())
      .subscribe(tasks => {
        this.dataSource = tasks;
        this.isLoadingActionItems = false;
        if (!this.cd['destroyed']) {
          this.cd.detectChanges();
        }
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
          this.cd.detectChanges();
          this.retrieveActionItems();
        }
      });
  }
  private getActionItem(itemId): void {
    this.tasksService
      .getActionItem(itemId)!
      .pipe(first())
      .subscribe(item => {
        if (!!item) {
          this.changeSpinnerValue();
          this.actionItem = item;
          this.cd.detectChanges();
        } else {
          this.changePath();
        }
        this.changeSpinnerValue();
      });
  }
  getQueryParams(): void {
    this.isLoadingActionItem = true;
    this.querySubscription = this.route.queryParams.subscribe(params => {
      this.actionItemId = params.id;
      if (this.actionItemId === undefined) {
        this.changePath();
        this.changeSpinnerValue();
        this.cd.detectChanges();
      }
      this.getActionItem(this.actionItemId);
    });
  }
  changePath(): void {
    this.router.navigateByUrl('/items');
    this.changeSpinnerValue();
  }
  changeSpinnerValue(): void {
    this.isLoadingActionItem = !this.isLoadingActionItem;
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
