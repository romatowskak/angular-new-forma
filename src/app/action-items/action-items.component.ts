import { AddItemComponent } from './../add-item/add-item.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { TasksService, ActionItem } from '../services/tasksService/tasks.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

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
  actionItemId: string;
  actionItem: Observable<ActionItem>;
  private subscription: Subscription;

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
    this.tasksService
      .getAllItems()
      .pipe(first())
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

  getQueryParams(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.actionItemId = params.id;
      this.getActionItem();
    });
  }
  changePath(): void {
    this.router.navigateByUrl('/items');
  }
  changeSpinnerValue(): void {
    this.isLoadingActionItem = !this.isLoadingActionItem;
    console.log('change spinner');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
