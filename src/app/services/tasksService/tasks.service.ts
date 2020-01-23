import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

export interface ActionItem {
  title: string;
  projectName: string;
  type?: string;
  completed?: string;
  dueDate?: Date;
  description?: string;
  id: string;
}

export interface AddActionItem {
  title: string;
  projectName: string;
  type?: string;
  completed?: string;
  dueDate?: Date;
  description?: string;
}

const STORAGE_KEY = 'local_dataTable';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly dataTable: ActionItem[] = [
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: '1',
      description: ''
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/12/29'),
      id: '2',
      description: ''
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0',
      dueDate: new Date('2019/11/15'),
      id: '3',
      description: ''
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: '4',
      description: ''
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/11/16'),
      id: '5',
      description: ''
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: '6',
      description: ''
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/11/16'),
      id: '7',
      description: ''
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0',
      dueDate: new Date('2020/01/05'),
      id: '8',
      description: ''
    }
  ];

  add(item: AddActionItem): Observable<ActionItem> {
    return new Observable(observer => {
      setTimeout(() => {
        const newActionItem = {
          ...item,
          id: this.itemId()
        };
        this.dataTable.push(newActionItem);
        observer.next(newActionItem);
      }, 1000);
    });
  }
  getAllItems(): Observable<ActionItem[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.dataTable);
      }, 1000);
    });
  }
  getActionItem(itemId: string | undefined): Observable<ActionItem> {
    const actionItem = this.dataTable.find(({ id }) => id === itemId);
    return new Observable(observer => {
      setTimeout(() => {
        if (actionItem) {
          observer.next(actionItem);
        } else {
          observer.error(new HttpResponse({ status: 404, statusText: 'No item with such ID found!' }));
        }
      }, 2000);
    });
  }
  deleteActionItem(itemId: string): Observable<ActionItem[]> {
    return new Observable(observer => {
      setTimeout(() => {
        this.dataTable.filter(item => {
          if (item.id === itemId) {
            this.dataTable.splice(this.dataTable.indexOf(item), 1);
            observer.next(this.dataTable);
          }
        }, 1000);
      });
    });
  }
  editActionItem(editedItem: ActionItem): Observable<ActionItem> {
    return new Observable(observer => {
      setTimeout(() => {
        this.dataTable.filter(item => {
          if (item.id === editedItem.id) {
            item.title = editedItem.title;
            item.projectName = editedItem.projectName;
            item.dueDate = editedItem.dueDate;
            item.description = editedItem.description;
            observer.next(item);
          }
        });
      }, 1000);
    });
  }
  itemId(): string {
    return (
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36)
    );
  }
}
