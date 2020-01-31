import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { TasksService, ActionItem } from '../services/tasksService/tasks.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { AddOrUpdateActionItemComponent } from '../add-item/add-item.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface ActionItemMapped extends ActionItem {
  dueDay?: number;
}

export interface DialogData {
  width: string;
  height: string;
  disableClose: boolean;
}

const dialogData: DialogData = { width: '470px', height: 'auto', disableClose: true };

export enum DialogMode {
  create = 'Create',
  edit = 'Edit'
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
  actionItem?: ActionItem;
  errorMessage?: string;
  dialogModeEnum: DialogMode;
  showImageWhenNoActionItem: boolean;
  dialogData: DialogData = dialogData;
  private actionItemIdForScroll?: string;
  private queryParamsSubscription: Subscription;
  private getActionItemSubscription: Subscription;

  constructor(
    private tasksService: TasksService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private scrollToService: ScrollToService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('emptyList', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/empty-inbox.svg'));
  }

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
        this.showImageWhenNoActionItem = false;
        this.showImageWhenNoActionItem = tasks.length === 0;
      });
  }
  openCreateDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ...this.dialogData,
      data: {
        dialogMode: DialogMode.create
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
        }
      });
  }
  private triggerScrollTo(itemId: string): void {
    const config: ScrollToConfigOptions = {
      target: itemId
    };
    this.scrollToService.scrollTo(config);
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
          if (this.actionItemIdForScroll) {
            this.triggerScrollTo(this.actionItemIdForScroll);
            this.actionItemIdForScroll = undefined;
          }
        },
        err => {
          err.status === 404
            ? (this.errorMessage = err.statusText)
            : (this.errorMessage = 'Oops! Something went wrong!');
          this.isLoadingActionItem = false;
        }
      );
  }
  private subscribeToQueryParams(): void {
    this.isLoadingActionItem = true;
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const actionItemId = params.id;
      if (actionItemId) {
        this.getActionItem(actionItemId);
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
    this.retrieveActionItems();
    this.subscribeToQueryParams();
  }
  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
