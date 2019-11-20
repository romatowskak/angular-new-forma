import { ActionTasksElement } from '../services/tasksService/tasks.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { TasksService } from '../services/tasksService/tasks.service';
import { DaysLeftToDeadlineService } from '../services/daysLeftToDeadlineService/days-left-to-deadline.service';

@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.css']
})
export class ActionItemsComponent implements OnInit {
  dataSource: ActionTasksElement[];
  loading = true;
  constructor(private tasksService: TasksService, private daysCountService: DaysLeftToDeadlineService) {}
  ngOnInit() {
    {
      this.tasksService
        .getAllTasks()
        .pipe(
          map(items => {
            const mappedActionItems = items.map(item => {
              const dueDayCounted = this.daysCountService.daysLeftToDeadline(item.dueDate, new Date());
              return { ...item, dueDay: dueDayCounted };
            });
            return mappedActionItems;
          })
        )
        .subscribe(tasks => {
          this.dataSource = tasks;
          this.loading = false;
        });
    }
  }
}
