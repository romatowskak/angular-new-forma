import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { ActionItem } from './../services/tasksService/tasks.service';
import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

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
  daysLeftVisibility: boolean;

  ngOnChanges() {
    if (this.item) {
      const itemDueDate = this.item.dueDate;
      this.daysLeftVisibility = !!itemDueDate;
    }
  }
}
