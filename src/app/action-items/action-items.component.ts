import { AddItemComponent } from './../add-item/add-item.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { TasksService, ActionItem } from '../services/tasksService/tasks.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

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
  actionItemId?: string;
  actionItem?: ActionItem;
  errorMessage?: string;
  justAddedItemId: string;
  scrollToJustAddedItem: boolean;
  private queryParamsSubscription: Subscription;
  private getActionItemSubscription: Subscription;

  constructor(
    private tasksService: TasksService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private scrollToService: ScrollToService
  ) {}

  ngOnInit() {
    this.retrieveActionItems();
    this.subscribeToQueryParams();
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
          this.justAddedItemId = item.id;
          this.router.navigate(['/items'], { queryParams: { id: this.justAddedItemId } });
          this.scrollToJustAddedItem = true;
        }
      });
  }
  private triggerScrollTo(itemId: string): void {
    const config: ScrollToConfigOptions = {
      target: itemId
    };
    this.scrollToService.scrollTo(config);
    this.scrollToJustAddedItem = false;
  }
  private getActionItem(itemId: string | undefined): void {
    this.isLoadingActionItem = true;
    if (this.getActionItemSubscription) {
      this.getActionItemSubscription.unsubscribe();
    }
    this.getActionItemSubscription = this.tasksService
      .getActionItem(itemId)
      .pipe(first())
      .subscribe(
        item => {
          this.isLoadingActionItem = false;
          this.actionItem = item;
          if (this.scrollToJustAddedItem) {
            this.triggerScrollTo(this.justAddedItemId);
          }
        },
        err => {
          if (err.status === 404) this.errorMessage = err.statusText;
        }
      );
  }
  subscribeToQueryParams(): void {
    this.isLoadingActionItem = true;
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.actionItemId = params.id;
      if (this.actionItemId) {
        this.getActionItem(this.actionItemId);
      }
    });
  }
  refreshViewAfterDeletion(): void {
    this.router.navigate(['/items']);
    this.retrieveActionItems();
    this.actionItem = undefined;
  }
  refreshViewAfterEditing(editedItemId): void {
    this.retrieveActionItems();
    this.scrollToJustAddedItem = true;
  }
  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
