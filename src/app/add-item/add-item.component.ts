import { TasksService } from './../services/tasksService/tasks.service';
import { Project, ProjectsService } from './../services/dialogProjects/dialog-projects.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActionTasksElement } from '../services/tasksService/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy {
  dialogForm: FormGroup;
  title = 'Create Action Item';
  projects: Project[];
  newActionItems: ActionTasksElement[] = [];
  subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    private formBuilder: FormBuilder,
    private dialogProjects: ProjectsService,
    private tasksService: TasksService
  ) {}
  ngOnInit() {
    this.subscription = this.dialogProjects.getProjectsNames().subscribe(projects => (this.projects = projects));
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required],
      project: ['', Validators.required],
      dueDate: '',
      description: ''
    });
  }
  createActionItem() {
    const projectName = this.dialogForm.get('project').value;
    const newItem = {
      title: this.dialogForm.get('name').value,
      projectName: projectName.name,
      type: 'General',
      completed: '60',
      dueDate: this.dialogForm.get('dueDate').value
    };
    this.tasksService.addActionItem(newItem);
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
