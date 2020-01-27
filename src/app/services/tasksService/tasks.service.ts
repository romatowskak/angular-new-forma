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

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private dataTable: ActionItem[] = [
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: '1',
      description: 'Item description.'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/12/29'),
      id: '2',
      description: 'Item description.'
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0',
      dueDate: new Date('2019/11/15'),
      id: '3',
      description: 'Item description.'
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: '4',
      description: 'Item description.'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/11/16'),
      id: '5',
      description: 'Item description.'
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: '6',
      description: 'Item description.'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/11/16'),
      id: '7',
      description: 'Item description.'
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0',
      dueDate: new Date('2020/01/05'),
      id: '8',
      description: 'Item description.'
    }
  ];

  add(actionItem: AddActionItem): Observable<ActionItem> {
    return new Observable(observer => {
      setTimeout(() => {
        const newActionItem = {
          ...actionItem,
          id: this.actionItemId()
        };
        this.dataTable = [...this.dataTable, newActionItem];
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
  getActionItem(actionItemId: string | undefined): Observable<ActionItem> {
    const actionItem = this.dataTable.find(({ id }) => id === actionItemId);
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
  deleteActionItem(actiontemId: string): Observable<ActionItem[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const deletedItemIndex = this.dataTable.findIndex(x => x.id === actiontemId);
        if (deletedItemIndex !== -1) {
          this.dataTable = [
            ...this.dataTable.slice(0, deletedItemIndex),
            ...this.dataTable.slice(deletedItemIndex + 1)
          ];
        }
        observer.next(this.dataTable);
      }, 1000);
    });
  }
  editActionItem(editedActionItem: ActionItem): Observable<string> {
    return new Observable(observer => {
      setTimeout(() => {
        this.dataTable = this.dataTable.map(item =>
          item.id !== editedActionItem.id ? item : { ...item, ...editedActionItem }
        );

        observer.next(editedActionItem.id);
      }, 1000);
    });
  }
  actionItemId(): string {
    return (
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36)
    );
  }
}
