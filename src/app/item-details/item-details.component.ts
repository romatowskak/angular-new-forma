import { DaysLeftCountedPipe } from './../pipes/daysLeftCountedPipe/days-left-counted.pipe';
import { ActionItem } from './../services/tasksService/tasks.service';
import { Component, Input, OnChanges, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  providers: [DaysLeftCountedPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnChanges {
  @Output() changePath = new EventEmitter();
  @Output() changeSpinnerValue = new EventEmitter();
  @Input() item: ActionItem;
  @Input() id: string;
  @Input() isLoadingActionItem: boolean;
  @Input() currentDate: Date;
  constructor(private daysLeftPipe: DaysLeftCountedPipe) {}
  ngOnChanges() {
    this.changeSpinnerValue.emit();
    if (this.item === undefined) {
      this.changePath.emit();
    }
  }
}
