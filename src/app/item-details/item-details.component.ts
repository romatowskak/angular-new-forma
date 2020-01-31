import { DialogData, DialogModeEnum } from './../action-items/action-items.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { ActionItem, TasksService } from './../services/tasksService/tasks.service';
import { Component, Input, ChangeDetectionStrategy, OnChanges, Output, EventEmitter } from '@angular/core';
import { ConfirmationDialogComponent } from '../confirmationDialog/confirmation-dialog/confirmation-dialog.component';
import { AddOrUpdateActionItemComponent } from '../add-item/add-item.component';
import { mergeMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  providers: [DaysLeftCountedPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnChanges {
  @Input() actionItem?: ActionItem;
  @Input() errorMessage?: string;
  @Input() isLoadingActionItem: boolean;
  @Input() dialogData: DialogData;
  @Input() dialogModeEnum: DialogModeEnum;
  @Input() showImageWhenNoActionItem: boolean;
  @Output() refreshViewAfterDeletion = new EventEmitter();
  @Output() refreshViewAfterEditing = new EventEmitter();
  daysLeftVisibility: boolean;

  constructor(private matDialog: MatDialog, private tasksService: TasksService) {}

  ngOnChanges() {
    if (this.actionItem) {
      const itemDueDate = this.actionItem.dueDate;
      this.daysLeftVisibility = !!itemDueDate;
    }
  }
  openConfirmationDialog(): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '380px',
      autoFocus: false
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(res => !!res),
        mergeMap(res => this.tasksService.deleteActionItem(this.actionItem ? this.actionItem.id : ''))
      )
      .subscribe(actionItemId => this.refreshViewAfterDeletion.emit(actionItemId));
  }
  openEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ...this.dialogData,
      data: {
        item: this.actionItem,
        id: this.actionItem ? this.actionItem : '',
        dialogMode: this.dialogModeEnum.edit
      }
    };
    this.matDialog
      .open(AddOrUpdateActionItemComponent, dialogConfig.data)
      .afterClosed()
      .subscribe(editedActionItemId => {
        if (editedActionItemId) {
          this.refreshViewAfterEditing.emit(editedActionItemId);
        }
      });
  }
}
