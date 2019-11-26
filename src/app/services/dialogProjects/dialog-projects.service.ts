import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DialogProject {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogProjectsService {
  private readonly dialogProjectsNames: DialogProject[] = [{ name: 'CASD Wilson & Lamberton Middle Schools' }];

  getProjectsNames(): Observable<DialogProject[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.dialogProjectsNames);
      }, 2000);
    });
  }
}
