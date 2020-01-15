import { TasksService } from './../../services/tasksService/tasks.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  title: string;
  projectName: string;
  dueDate: string;
  id: string;

  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,
    private tasksService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.title = this.data.title;
    this.projectName = this.data.projectName;
    this.dueDate = this.data.dueDate;
    this.id = this.data.id;
  }

  editData() {
    this.tasksService.editActionItem(this.id, this.title);
    this.dialogRef.close();
  }
}
