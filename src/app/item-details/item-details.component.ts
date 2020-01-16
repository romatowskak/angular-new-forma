import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { ActionItem, TasksService } from './../services/tasksService/tasks.service';
import { Component, Input, ChangeDetectionStrategy, OnChanges, Output, EventEmitter } from '@angular/core';
import { ConfirmationDialogComponent } from '../confirmationDialog/confirmation-dialog/confirmation-dialog.component';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  providers: [DaysLeftCountedPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnChanges {
  @Input() item?: ActionItem;
  @Input() id: string;
  @Input() errorMessage?: string;
  @Input() isLoadingActionItem: boolean;
  @Output() refreshViewAfterDeletion = new EventEmitter();
  @Output() refreshViewAfterEditing = new EventEmitter();
  daysLeftVisibility: boolean;

  constructor(private matDialog: MatDialog, private tasksService: TasksService) {}

  ngOnChanges() {
    if (this.item) {
      const itemDueDate = this.item.dueDate;
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
        this.tasksService.deleteActionItem(this.id);
        this.refreshViewAfterDeletion.emit();
      }
    });
  }
  openEditDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      width: '470px',
      height: 'auto',
      disableClose: true,
      data: {
        title: !!this.item ? this.item.title : '',
        projectName: !!this.item ? this.item.projectName : '',
        dueDate: !!this.item ? this.item.dueDate : '',
        id: this.id
      }
    };
    this.matDialog
      .open(AddItemComponent, dialogConfig.data)
      .afterClosed()
      .subscribe(editedItem => {
        this.refreshViewAfterEditing.emit(editedItem.id);
      });
  }
}
