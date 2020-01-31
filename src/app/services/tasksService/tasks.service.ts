import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

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
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}
  private readonly localStorageKey = 'localDataTable';
  private dataTable: ActionItem[] = [
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: this.actionItemId(),
      description: 'Item description.'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/12/29'),
      id: this.actionItemId(),
      description: 'Item description.'
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0',
      dueDate: new Date('2019/11/15'),
      id: this.actionItemId(),
      description: 'Item description.'
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: this.actionItemId(),
      description: 'Item description.'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/11/16'),
      id: this.actionItemId(),
      description: 'Item description.'
    },
    {
      title: 'Android - UI Automation Test',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '80',
      dueDate: new Date('2019/11/17'),
      id: this.actionItemId(),
      description: 'Item description.'
    },
    {
      title: 'The Flash Tutorial',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'General',
      completed: '70',
      dueDate: new Date('2019/11/16'),
      id: this.actionItemId(),
      description: 'Item description.'
    },
    {
      title: 'Cleaning and Organising Your Computer',
      projectName: 'CASD Wilson & Lamberton Middle Schools',
      type: 'Clash',
      completed: '0',
      dueDate: new Date('2020/01/05'),
      id: this.actionItemId(),
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
        this.storage.set(this.localStorageKey, this.dataTable);
        observer.next(newActionItem);
      }, 1000);
    });
  }
  getAllItems(): Observable<ActionItem[]> {
    if (this.storage.get(this.localStorageKey) === undefined) {
      this.storage.set(this.localStorageKey, this.dataTable);
    }
    return new Observable(observer => {
      setTimeout(() => {
        this.dataTable = this.storage.get(this.localStorageKey);
        observer.next(this.dataTable);
      }, 1000);
    });
  }
  getActionItem(actionItemId: string | undefined): Observable<ActionItem> {
    this.dataTable = this.storage.get(this.localStorageKey);
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
  deleteActionItem(actionItemId: string): Observable<ActionItem[]> {
    return new Observable(observer => {
      setTimeout(() => {
        this.dataTable = this.dataTable.filter(data => data.id !== actionItemId);
        this.storage.set(this.localStorageKey, this.dataTable);
        observer.next(this.dataTable);
      }, 1000);
    });
  }
  editActionItem(editedActionItem: ActionItem): Observable<ActionItem> {
    return new Observable(observer => {
      setTimeout(() => {
        this.dataTable = this.dataTable.map(item =>
          item.id !== editedActionItem.id ? item : { ...item, ...editedActionItem }
        );
        this.storage.set(this.localStorageKey, this.dataTable);
        observer.next(editedActionItem);
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
