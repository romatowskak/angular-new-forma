import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

export interface ActionTasksElement {
  title: string;
  projectName: string;
  type: string;
  completed: string;
  dueDate: object;
  dueDay: number;
  color: string;
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
      dueDate: new Date('2019/11/08'),
      dueDay: 0,
      color: ''
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70%',
      dueDate: new Date('2019/11/29'),
      dueDay: 0,
      color: ''
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0%',
      dueDate: new Date('2019/11/15'),
      dueDay: 0,
      color: ''
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80%',
      dueDate: new Date('2019/11/25'),
      dueDay: 0,
      color: ''
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70%',
      dueDate: new Date('2019/11/17'),
      dueDay: 0,
      color: ''
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0%',
      dueDate: new Date('2019/11/14'),
      dueDay: 0,
      color: ''
    }
  ];

  passTableData() {
    return this.tableData;
  }

  getAllTasks(): Observable<ActionTasksElement[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.tableData);
      }, 1000);
    });
  }

  getCurrentDate() {
    // getting current date
    const currentDate = new Date();
    // calculating "Days Left" based on current date and due date
    for (let task of this.tableData) {
      const dueDate = task.dueDate;
      const diff = (dueDate as Date).getDate() - (currentDate as Date).getDate();
      task.dueDay = diff;
      // format date to dd/mm/yy
      task.dueDate = (dueDate as Date).toLocaleDateString('en-GB') as String;
    }
  }
}
