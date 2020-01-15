import { EditItemComponent } from './../edit-item/edit-item/edit-item.component';
import { MatDialog } from '@angular/material/dialog';
import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { ActionItem, TasksService } from './../services/tasksService/tasks.service';
import { Component, Input, ChangeDetectionStrategy, OnChanges, Output, EventEmitter } from '@angular/core';
import { ConfirmationDialogComponent } from '../confirmationDialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  providers: [DaysLeftCountedPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnChanges {
  @Input() item: ActionItem | undefined;
  @Input() id: string;
  @Input() errorMessage: string | undefined;
  @Input() isLoadingActionItem: boolean;
  @Output() refreshViewAfterDeletion = new EventEmitter();
  @Output() refreshViewAfterEditing = new EventEmitter();
  daysLeftVisibility: boolean;

  constructor(private dialog: MatDialog, private tasksService: TasksService) {}

  ngOnChanges() {
    if (this.item) {
      const itemDueDate = this.item.dueDate;
      this.daysLeftVisibility = !!itemDueDate;
    }
  }
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
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
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '470px',
      height: 'auto',
      autoFocus: false,
      disableClose: true,
      data: {
        title: !!this.item ? this.item.title : '',
        projectName: !!this.item ? this.item.projectName : '',
        dueDate: !!this.item ? this.item.dueDate : '',
        id: this.id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.refreshViewAfterEditing.emit();
    });
  }
}
