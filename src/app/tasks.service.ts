import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

export interface ActionTasksElement {
  title: string;
  projectName: string;
  type: string;
  completed: string;
  dueDate: string;
  daysLeft: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor() {}
  tableData: ActionTasksElement[] = [
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80%',
      dueDate: '23/12/2019',
      daysLeft: 'TODO: count amount'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70%',
      dueDate: '26/12/2019',
      daysLeft: 'TODO: count amount'
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0%',
      dueDate: '23/12/2019',
      daysLeft: 'TODO: count amount'
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80%',
      dueDate: '23/12/2019',
      daysLeft: 'TODO: count amount'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70%',
      dueDate: '26/12/2019',
      daysLeft: 'TODO: count amount'
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0%',
      dueDate: '23/12/2019',
      daysLeft: 'TODO: count amount'
    }
  ];
  getAllTasks() {
    return new Observable(observer => {
      setInterval(() => {
        observer.next(this.tableData);
      }, 1000);
    });
  }
}
