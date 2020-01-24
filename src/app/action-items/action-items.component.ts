import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { TasksService, ActionItem } from '../services/tasksService/tasks.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { AddOrUpdateActionItemComponent } from '../add-item/add-item.component';

export interface ActionItemMapped extends ActionItem {
  dueDay?: number;
}

export interface DialogData {
  width: string;
  height: string;
  disableClose: boolean;
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
  actionItemIdForScroll: string;
  scrollToActionItem: boolean;
  createDialog: boolean;
  dialogData: DialogData;
  showImageWhenNoActionItem: boolean;
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
    this.dialogData = { width: '470px', height: 'auto', disableClose: true };
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
        this.showImageWhenNoActionItem = false;
        if (tasks.length === 0) this.showImageWhenNoActionItem = true;
      });
  }
  openDialog(): void {
    this.createDialog = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ...this.dialogData,
      data: {
        createDialog: this.createDialog
      }
    };
    this.matDialog
      .open(AddOrUpdateActionItemComponent, dialogConfig.data)
      .afterClosed()
      .subscribe(item => {
        if (!!item) {
          this.retrieveActionItems();
          this.actionItemIdForScroll = item.id;
          this.router.navigate(['/items'], { queryParams: { id: this.actionItemIdForScroll } });
          this.scrollToActionItem = true;
        }
      });
  }
  private triggerScrollTo(itemId: string): void {
    const config: ScrollToConfigOptions = {
      target: itemId
    };
    this.scrollToService.scrollTo(config);
    this.scrollToActionItem = false;
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
          this.actionItemIdForScroll = item.id;
          if (this.scrollToActionItem) {
            this.triggerScrollTo(this.actionItemIdForScroll);
          }
        },
        err => {
          err.status === 404 ? (this.errorMessage = err.statusText) : 'Oops! Something went wrong!';
          this.isLoadingActionItem = false;
        }
      );
  }
  private subscribeToQueryParams(): void {
    this.scrollToActionItem = true;
    this.isLoadingActionItem = true;
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.actionItemId = params.id;
      if (this.actionItemId) {
        this.getActionItem(this.actionItemId);
      } else {
        this.isLoadingActionItem = false;
      }
    });
  }
  refreshViewAfterDeletion(): void {
    this.router.navigate(['/items']);
    this.retrieveActionItems();
    this.actionItem = undefined;
    this.errorMessage = undefined;
  }
  refreshViewAfterEditing(editedItemId): void {
    this.actionItemIdForScroll = editedItemId;
    this.scrollToActionItem = true;
    this.subscribeToQueryParams();
  }
  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
