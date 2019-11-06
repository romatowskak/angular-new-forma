import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

export interface ActionTasksElement {
  title: string;
  type: string;
  completed: string;
  dueDate: string;
  daysLeft: number;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor() {}
  tableData: ActionTasksElement[] = [
    {
      title: 'Android - UI Automation Test',
      type: 'General',
      completed: '80%',
      dueDate: '23/12/2019',
      daysLeft: 21
    },
    {
      title: 'The Flash Tutorial',
      type: 'General',
      completed: '70%',
      dueDate: '26/12/2019',
      daysLeft: 26
    },
    {
      title: 'Cleaning and Organising Your Computer',
      type: 'Clash',
      completed: '0%',
      dueDate: '23/12/2019',
      daysLeft: 27
    },
    {
      title: 'Android - UI Automation Test',
      type: 'General',
      completed: '80%',
      dueDate: '23/12/2019',
      daysLeft: 21
    },
    {
      title: 'The Flash Tutorial',
      type: 'General',
      completed: '70%',
      dueDate: '26/12/2019',
      daysLeft: 26
    },
    {
      title: 'Cleaning and Organising Your Computer',
      type: 'Clash',
      completed: '0%',
      dueDate: '23/12/2019',
      daysLeft: 27
    }
  ];
  getAllTasks() {
    return new Observable(observer => {
      setInterval(() => {
        observer.next(this.tableData);
      }, 2000);
    });
  }
}
