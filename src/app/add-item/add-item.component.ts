import { TasksService } from './../services/tasksService/tasks.service';
import { DialogProjectsService, DialogProject } from './../services/dialogProjects/dialog-projects.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActionTasksElement } from '../services/tasksService/tasks.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  dialogForm: FormGroup;
  title = 'Create Action Item';
  projects: DialogProject[];
  newActionItems: ActionTasksElement[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    private formBuilder: FormBuilder,
    private dialogProjects: DialogProjectsService,
    private tasksService: TasksService
  ) {}
  ngOnInit() {
    this.dialogProjects.getProjectsNames().subscribe(projects => (this.projects = projects));
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required],
      project: ['', Validators.required],
      dueDate: '',
      description: ''
    });
  }

  createActionItem() {
    const newItem = {
      title: this.dialogForm.get('name').value,
      projectName: this.dialogForm.get('project').value,
      type: 'General',
      completed: '60',
      dueDate: this.dialogForm.get('dueDate').value
    };
    this.tasksService.updateTableData(newItem);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
