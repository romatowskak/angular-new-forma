import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";

export interface ActionTasksElement {
  title: string;
  projectName: string;
  type: string;
  completed: string;
  dueDate: Date;
}

@Injectable({
  providedIn: "root"
})
export class TasksService {
  private readonly tableData: ActionTasksElement[] = [
    {
      title: "Android - UI Automation Test",
      projectName: "CASD Wilson & Lamberton Middle Schools",
      type: "General",
      completed: "80",
      dueDate: new Date("2019/11/08")
    },
    {
      title: "The Flash Tutorial",
      projectName: "CASD Wilson & Lamberton Middle Schools",
      type: "General",
      completed: "70",
      dueDate: new Date("2019/12/29")
    },
    {
      title: "Cleaning and Organising Your Computer",
      projectName: "CASD Wilson & Lamberton Middle Schools",
      type: "Clash",
      completed: "0",
      dueDate: new Date("2019/11/15")
    },
    {
      title: "Android - UI Automation Test",
      projectName: "CASD Wilson & Lamberton Middle Schools",
      type: "General",
      completed: "80",
      dueDate: new Date("2019/11/11")
    },
    {
      title: "The Flash Tutorial",
      projectName: "CASD Wilson & Lamberton Middle Schools",
      type: "General",
      completed: "70",
      dueDate: new Date("2019/11/13")
    },
    {
      title: "Cleaning and Organising Your Computer",
      projectName: "CASD Wilson & Lamberton Middle Schools",
      type: "Clash",
      completed: "0",
      dueDate: new Date("2020/01/05")
    }
  ];

  getAllTasks(): Observable<ActionTasksElement[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.tableData);
      }, 1000);
    });
  }

  // getCurrentDate() {
  //   // getting current date
  //   const currentDate = new Date();
  //   // calculating "Days Left" based on current date and due date
  //   for (const task of this.tableData) {
  //     const dueDate = task.dueDate;
  //     const diffInMoths = dueDate.getTime() - currentDate.getTime();
  //     const diffInDays = Math.round(diffInMoths / (1000 * 3600 * 24));
  //     task.dueDay = diffInDays;
  //   }
  // }
}
