import { ActionItem } from './../services/tasksService/tasks.service';
import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
  constructor(private router: Router, private daysCountService: DaysLeftToDeadlineService) {}
  ngOnChanges() {
    this.isLoadingActionItem = !this.isLoadingActionItem;
    if (this.item) {
      this.isLoadingActionItem = false;
      const dueDayCounted = this.item.dueDate
        ? this.daysCountService.daysLeftToDeadline(this.item.dueDate, this.currentDate)
        : undefined;
      this.item = { ...this.item, dueDay: dueDayCounted };
    }
    if (this.item === undefined) {
      this.router.navigateByUrl('/items');
    }
  }
}
