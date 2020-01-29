import { DialogData } from './../action-items/action-items.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { ActionItem, TasksService } from './../services/tasksService/tasks.service';
import { Component, Input, ChangeDetectionStrategy, OnChanges, Output, EventEmitter } from '@angular/core';
import { ConfirmationDialogComponent } from '../confirmationDialog/confirmation-dialog/confirmation-dialog.component';
import { AddOrUpdateActionItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  providers: [DaysLeftCountedPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnChanges {
  @Input() actionItem?: ActionItem;
  @Input() actionItemId: string;
  @Input() errorMessage?: string;
  @Input() isLoadingActionItem: boolean;
  @Input() dialogData: DialogData;
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
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.tasksService.deleteActionItem(this.actionItemId).subscribe(actionItems => {
          this.refreshViewAfterDeletion.emit(actionItems);
        });
      }
    });
  }
  openEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ...this.dialogData,
      data: {
        item: this.actionItem,
        id: this.actionItemId
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
