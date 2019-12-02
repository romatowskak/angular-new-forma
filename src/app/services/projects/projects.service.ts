import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Project {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly projectsNames: Project[] = [{ name: 'CASD Wilson & Lamberton Middle Schools' }];
  getProjectsNames(): Observable<Project[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.projectsNames);
      }, 2000);
    });
  }
}
