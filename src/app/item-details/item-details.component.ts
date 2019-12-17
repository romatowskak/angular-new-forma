import { TasksService, ActionItem } from './../services/tasksService/tasks.service';
import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnInit, OnChanges {
  item;
  @Input() id;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.getActionItem();
  }

  private getActionItem(): void {
    this.item = this.tasksService.getActionItem(this.id);
    console.log(this.item);
  }
}
