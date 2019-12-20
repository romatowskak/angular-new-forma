import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { ActionItem } from './../services/tasksService/tasks.service';
import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DaysLeftToDeadlineService } from '../services/daysLeftToDeadlineService/days-left-to-deadline.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnChanges {
  @Input() item: ActionItem;
  @Input() id: string;
  @Input() isLoadingActionItem: boolean;
  @Input() currentDate: Date;
  constructor(private router: Router, private daysLeftPipe: DaysLeftCountedPipe) {}
  ngOnChanges() {
    this.isLoadingActionItem = !this.isLoadingActionItem;
    if (this.item) {
      this.isLoadingActionItem = false;
      this.item = this.daysLeftPipe.transform(this.item, this.item.dueDate, this.currentDate);
    }
    if (this.item === undefined) {
      this.router.navigateByUrl('/items');
    }
  }
}
