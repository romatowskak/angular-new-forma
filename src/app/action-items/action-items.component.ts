import { TasksService } from './../tasks.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.css']
})
export class ActionItemsComponent implements OnInit, OnDestroy {
  color = '';
  loading = true;
  displayedColumns: string[] = ['title', 'type', 'completed', 'dueDate', 'daysLeft'];
  dataSource;
  dataSourceFetchedAgain;
  private subscription: Subscription;

  constructor(private tasksService: TasksService) {
    this.subscription = this.tasksService.getAllTasks().subscribe(tasks => {
      this.dataSource = tasks;
      this.loading = false;
    });
    this.dataSourceFetchedAgain = this.tasksService.passTableData();
  }

  ngOnInit() {
    this.tasksService.getCurrentDate();
    // here console log prints undefined, that's why I fetched tableData from tasksService again
    // using passTableData() function which returns tableData
    console.log(this.dataSource);

    this.tasksService.passTableData();
    for (let item of this.dataSourceFetchedAgain) {
      // console log prints numbers
      console.log(item.dueDay);
      console.log(item.color);
      debugger;
      // color change not working
      if (item.dueDay <= 0) {
        this.color = '#fc0800';
      } else if (item.dueDay >= 1 && item.dueDay <= 2) {
        this.color = '#fcbd00';
      } else {
        this.color = '#979797';
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
