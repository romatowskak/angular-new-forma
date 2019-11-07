import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

export interface ActionTasksElement {
  title: string;
  projectName: string;
  type: string;
  completed: string;
  dueDate: string;
  dueDay: string;
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
      dueDate: '2019/11/13',
      dueDay: '',
      daysLeft: 'TODO: count amount'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70%',
      dueDate: '2019/11/18',
      dueDay: '',
      daysLeft: 'TODO: count amount'
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0%',
      dueDate: '2019/11/29',
      dueDay: '',
      daysLeft: 'TODO: count amount'
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80%',
      dueDate: '2019/11/11',
      dueDay: '',
      daysLeft: 'TODO: count amount'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70%',
      dueDate: '2019/11/30',
      dueDay: '',
      daysLeft: 'TODO: count amount'
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0%',
      dueDate: '2019/11/25',
      dueDay: '',
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

  getCurrentDate() {
    // getting current date
    const currentDate = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, '/');

    // gettint current day
    const currentDay = new Date().getDate();

    // subtracting duedate of every object from current day, and counting how many days are left
    // creating new object property "dueDate"

    for (let task of this.tableData) {
      const dueDate = task.dueDate;
      const dueDaysArray = dueDate.split('/');
      const dueDay = parseInt(dueDaysArray[2]);
      const diff = dueDay - currentDay;
      task.dueDay = JSON.stringify(diff);
    }
  }
}
